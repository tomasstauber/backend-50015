import express from "express";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/controllers/cartManager.js";

//Configuración del servidor
const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.get("/", (req, res) => {
    res.send("Bienvenidos")
});

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

const hhtpServer = app.listen(PORT, () => {
    console.log("Servidor activo en el puerto: " + PORT);
});