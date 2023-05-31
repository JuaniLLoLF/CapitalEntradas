let express = require("express");
let { dbConnection } = require("./db/config");
require("dotenv").config();
let app = express();
let cors = require("cors");
let port = process.env.PORT;

app.use(cors());
app.use(express.json());
dbConnection();
app.use("/", require("./routes/route.js"));
app.use("/usuarios", require("./routes/usuarios.js"));
app.use("/tickets", require("./routes/tickets.js"));
app.use("/eventos", require("./routes/eventos.js"));
app.use("/entradas", require("./routes/entradas.js"));
app.use("/credenciales", require("./routes/credenciales.js"));

app.listen(port);
console.clear();
console.log(`\nEscuchando el puerto http://localhost:${port}/`);
