import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";
import ProductManager from "./src/controllers/productManager.js";

//Configuración del servidor
const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log("Servidor activo en el puerto: " + PORT);
});
const socketServer = new Server(httpServer);
const PM = new ProductManager();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Routers
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/", viewsRouter);

//Socket
socketServer.on("connection", async (socket) => {
    console.log("Nueva Conexión!");

        socket.emit("productos", await PM.getProducts());

    socket.on("nuevoProducto", async (product) => {
        await PM.addProduct(product);
        socket.emit("productos", await PM.getProducts());
    });

    socket.on("eliminarProducto", async (id) => {
        await PM.deleteProduct(id);
        socket.emit("productos", await PM.getProducts());
    });
});