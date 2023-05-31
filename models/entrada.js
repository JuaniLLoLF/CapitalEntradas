let mongoose = require("mongoose");
let { Schema } = require("mongoose");

let EntradaSchema = new Schema({
  eventoId: {
    type: Schema.Types.ObjectId,
    ref: "Eventos",
    required: [true, "El evento es obligatorio"],
  },
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    required: [true, "El usuario es obligatorio"],
  },
  fechaCreacion: {
    type: String,
    required: [true, "La fecha es obligatoria"],
  },
  codigo: {
    type: String,
    required: [true, "El código es obligatorio"],
  },
});

module.exports = mongoose.model("Entradas", EntradaSchema);
