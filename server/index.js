const express = require("express");
const db = require("./config/db");
const fileUpload = require("express-fileupload");

const cors = require("cors");

// Crear servidor
const app = express();

// Conectar la base de datos
db.authenticate()
    .then(() => console.log("Base de datos Conectada"))
    .catch( error => console.log(error));

// Habilitar CORS
app.use( cors({ credentials: true, origin: true }) );
app.options("*", cors());

// Habilitar express.json
app.use( express.json() );

// FileUpload
app.use( fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }) );

// Definir puerto
const port = process.env.PORT || 4000;

// Importar Rutas
app.use("/api/orders", require("./routes/orders"));
// app.use("/api/votes", require("./routes/votes"));
app.use("/api/ingredients", require("./routes/ingredients"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/meals", require("./routes/meals"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/users", require("./routes/users"));
app.use("/api/alerts", require("./routes/alerts"));
app.use("/api/auth", require("./routes/auth"));

// Run App
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});