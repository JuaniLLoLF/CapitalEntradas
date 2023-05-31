let { Router } = require("express");
let router = Router();
let Ticket = require("../models/ticket");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");

router.get("/", async (req, res) => {
  let tickets = await Ticket.find();

  res.json({
    tickets,
  });
});

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  async (req, res) => {
    const { email, titulo, descripcion } = req.body;

    let ticket = new Ticket({
      email,
      titulo,
      descripcion,
    });

    try {
      await ticket.save();

      res.json({
        ticket,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al guardar el ticket",
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
      await Ticket.findByIdAndRemove(id);

      res.json({
        msg: "Ticket eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al eliminar el ticket",
      });
    }
  }
);

module.exports = router;
