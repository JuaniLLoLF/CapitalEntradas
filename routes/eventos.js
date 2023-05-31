let { Router } = require("express");
let router = Router();
let Evento = require("../models/evento");
let { check } = require("express-validator");
let { validarCampos } = require("../middlewares/validar-campos");

router.get("/", async (req, res) => {
  let eventos = await Evento.find();

  res.json({
    eventos,
  });
});

router.post(
  "/",
  [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("ubicacion", "La ubicacion es obligatoria").not().isEmpty(),
    check("fecha", "La fecha es obligatoria").not().isEmpty(),
    check("foto", "La foto es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  async (req, res) => {
    const { titulo, descripcion, ubicacion, fecha, foto } = req.body;

    let evento = new Evento({
      titulo,
      descripcion,
      ubicacion,
      fecha,
      foto,
    });

    try {
      await evento.save();

      res.json({
        evento,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al guardar el evento",
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
      await Evento.findByIdAndRemove(id);

      res.json({
        msg: "Evento borrado",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al borrar el evento",
      });
    }
  }
);

module.exports = router;
