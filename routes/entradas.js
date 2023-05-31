let { Router } = require("express");
let router = Router();
let Entrada = require("../models/entrada");
let Usuario = require("../models/usuario");
let Evento = require("../models/evento");
let { validarCampos } = require("../middlewares/validar-campos");
let { check } = require("express-validator");
let { existeEventoId, existeUsuarioId } = require("../helpers/db-validadores");
let { v4: uuidv4 } = require("uuid");
let sendEmail = require("../helpers/sendEmail");

router.get("/", async (req, res) => {
  let entradas = await Entrada.find()
    .populate("eventoId")
    .populate("usuarioId");

  res.json({
    entradas,
  });
});

// UNA RUTA PARA OBTENER LAS ENTRADAS DE UN USUARIO
router.get("/usuario/:id", async (req, res) => {
  let { id } = req.params;

  let usuario = await Usuario.findById(id)
    .populate("entradas")
    .populate({
      path: "entradas",
      populate: {
        path: "eventoId",
      },
    });

  if (!usuario) {
    return res.status(404).json({
      msg: "Usuario no encontrado",
    });
  }

  res.json({
    usuario,
  });
});

router.post(
  "/",
  [
    check("eventoId", "El id de evento es incorrecto").isMongoId(),
    check("eventoId").custom((id) => existeEventoId(id)),
    check("usuarioId", "El id de usuario es incorrecto").isMongoId(),
    check("usuarioId").custom((id) => existeUsuarioId(id)),
    validarCampos,
  ],
  async (req, res) => {
    let { eventoId, usuarioId } = req.body;

    let entrada = new Entrada({
      eventoId,
      usuarioId,
      fechaCreacion: new Date().toISOString(),
      codigo: uuidv4(),
    });

    let usuario = await Usuario.findById(usuarioId);
    usuario.entradas.push(entrada._id);
    let evento = await Evento.findById(eventoId);

    try {
      await entrada.save();
      await usuario.save();

      await sendEmail(
        usuario.email,
        `Entrada ${evento.titulo}`,
        `¡Has obtenido la entrada para el evento ${evento.titulo}! <br/><br/>El código secreto es: ${entrada.codigo}`
      );

      res.json({
        entrada,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al crear la entrada",
      });
    }
  }
);

router.delete(
  "/:id",
  [check("id", "El id de entrada es incorrecto").isMongoId(), validarCampos],
  async (req, res) => {
    let { id } = req.params;

    try {
      let entrada = await Entrada.findById(id);

      if (!entrada) {
        return res.status(404).json({
          msg: "Entrada no encontrada",
        });
      }

      await Entrada.findByIdAndDelete(id);

      res.json({
        msg: "Entrada eliminada",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al eliminar la entrada",
      });
    }
  }
);

module.exports = router;
