let mongoose = require("mongoose");
let { Schema } = require("mongoose");

let UsuarioSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  contrasenya: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  entradas: {
    // ARRAY DE ENTRADAS
    type: [Schema.Types.ObjectId],
    ref: "Entradas",
  },
});

UsuarioSchema.methods.toJSON = function () {
  let { __v, contrasenya, ...usuario } = this.toObject();
  return usuario;
};

module.exports = mongoose.model("Usuarios", UsuarioSchema);
