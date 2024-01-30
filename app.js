import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";
//import ProductManager from "./src/dao/productManager.js";
import ProductManager from "./src/dao/productManagerDB.js";
import mongoose from "mongoose";

//Configuración del servidor
const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log("Servidor activo en el puerto: " + PORT);
});
const socketServer = new Server(httpServer);

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

//Mongoose

const urlConnect = "mongodb+srv://tomastauber:ZWx5dcTbW71K5hk4@tomascluster.tkfwypg.mongodb.net/e-commerce?retryWrites=true&w=majority";
mongoose.connect(urlConnect)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => {
        console.log("Error al conectar con la base de datos!", error.message);
        throw error;
    });
    
//Socket
socketServer.on("connection", async (socket) => {

        const PM = new ProductManager("./src/dao/products.json");

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