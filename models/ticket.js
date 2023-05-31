let mongoose = require("mongoose");
let { Schema } = require("mongoose");

let TicketSchema = new Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
  },
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tickets", TicketSchema);
