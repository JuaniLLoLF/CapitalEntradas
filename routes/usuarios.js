let { Router } = require("express");
let router = Router();
let Usuario = require("../models/usuario");
let { check } = require("express-validator");
let { validarCampos } = require("../middlewares/validar-campos");
let { emailEnUso } = require("../helpers/db-validadores");
let bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  let usuarios = await Usuario.find().populate("entradas");

  res.json({
    usuarios,
  });
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  let usuario = await Usuario.findById(id).populate("entradas");

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
    check("email", "El email es obligatorio").isEmail(),
    check("email").custom((email) => emailEnUso(email)),
    check("nombreCompleto", "El nombre es obligatorio").not().isEmpty(),
    check("contrasenya", "La contraseña es obligatoria").not().isEmpty(),

    validarCampos,
  ],
  async (req, res) => {
    let { nombreCompleto, email, contrasenya, rol } = req.body;

    let salt = bcrypt.genSaltSync(10);
    contrasenya = bcrypt.hashSync(contrasenya, salt);

    let usuario = new Usuario({
      nombreCompleto,
      email,
      contrasenya,
      rol: rol || "USER_ROLE",
    });

    try {
      await usuario.save();

      res.json({
        usuario,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al guardar el usuario",
      });
    }
  }
);

router.delete(
  "/:id",
  [
    check("id", "El id es necesario").not().isEmpty(),
    check("id", "El id es incorrecto").isMongoId(),
    validarCampos,
  ],
  async (req, res) => {
    let { id } = req.params;

    try {
      await Usuario.findByIdAndRemove(id);

      res.json({
        msg: "Usuario borrado",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al borrar el usuario",
      });
    }
  }
);

module.exports = router;
