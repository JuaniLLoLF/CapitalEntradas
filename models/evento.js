let mongoose = require("mongoose");
let { Schema } = require("mongoose");

let EventoSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  ubicacion: {
    type: String,
    required: [true, "La ubicacion es obligatoria"],
  },
  fecha: {
    type: String,
    required: [true, "La fecha es obligatoria"],
  },
  foto: {
    type: String,
    required: [true, "La foto es obligatoria"],
  },
});

module.exports = mongoose.model("Eventos", EventoSchema);
