let Usuario = require("../models/usuario");
let Evento = require("../models/evento");

async function emailEnUso(email) {
  let existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya está en uso`);
  }
}

async function existeUsuarioId(id) {
  let existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`No existe usuario con el id ${id}`);
  }
}

async function existeEventoId(id) {
  let existeEvento = await Evento.findById(id);

  if (!existeEvento) {
    throw new Error(`No existe evento con el id ${id}`);
  }
}

module.exports = {
  emailEnUso,
  existeUsuarioId,
  existeEventoId,
};
