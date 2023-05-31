let { Router } = require("express");
let router = Router();
let Usuario = require("../models/usuario");
let bcrypt = require("bcrypt");
let { validarCampos } = require("../middlewares/validar-campos");
let { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email", "Introduce un email válido").isEmail(),
    check("contrasenya", "Introduce una contraseña").not().isEmpty(),
    validarCampos,
  ],
  async (req, res) => {
    let { email, contrasenya } = req.body;

    try {
      let usuario = await Usuario.findOne({ email }).populate("entradas");

      if (!usuario) {
        return res.json({
          campo: "Email",
          msg: "No existe usuario con el email introducido",
        });
      }

      let contrasenyaValida = bcrypt.compareSync(
        contrasenya,
        usuario.contrasenya
      );

      if (!contrasenyaValida) {
        return res.status(400).json({
          campo: "Contraseña",
          msg: "La contraseña es incorrecta",
        });
      }

      res.json({
        usuario,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error al hacer el login",
      });
    }
  }
);

module.exports = router;
