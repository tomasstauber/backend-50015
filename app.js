import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";
import ProductManager from "./src/dao/productManagerDB.js";
import mongoose from "mongoose";
import chatManager from "./src/dao/chatManager.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./src/routes/sessions.router.js";
import usersRouter from "./src/routes/users.router.js";
import __dirname from "./src/utils.js";
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";

//Configuración del servidor
const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log("Servidor activo en el puerto: " + PORT);
});
const socketServer = new Server(httpServer);
const urlConnect = "mongodb+srv://tomastauber:ZWx5dcTbW71K5hk4@tomascluster.tkfwypg.mongodb.net/e-commerce?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: urlConnect,
        ttl: 90
    })
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session()); 
app.use((req, res, next) => {
    req.isLoggedIn = req.session.user ? true : false;
    next();
});


//Handlebars
app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views");


//Routers
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter)
app.use("/", viewsRouter);

//Mongoose
mongoose.connect(urlConnect)
    .then(() => console.log("Conectado a la base de datos"))
    .catch((error) => {
        console.log("Error al conectar con la base de datos!", error.message);
        throw error;
    });

const CM = new chatManager();

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

    socket.on("newMessage", async (data) => {
        CM.createMessage(data);
        const messages = await CM.getMessages();
        socket.emit("messages", messages);
    });
});