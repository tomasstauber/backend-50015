import express from "express";
import CartManager from "../controllers/cartManager.js";

const cartsRouter = express.Router();
const CM = new CartManager();

cartsRouter.post("/", (req, res) => {
    if (CM.newCart()) {
        res.send({status:"ok", message:"El Carrito se creó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo crear el Carrito!"});
    }
});

cartsRouter.get("/:cid", (req, res) => {
    const cid = Number(req.params.cid);
    const cart = CM.getCart(cid);

    if (cart) {
        res.send({products:cart.products});
    } else {
        res.status(400).send({status:"error", message:"Error! ID inexistente!"});
    }
});

cartsRouter.post("/:cid/products/:pid", (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const cart = CM.getCart(cid);

    if (cart) {
        if (CM.addProductToCart(cid, pid)) {
            res.send({status:"ok", message:"Producto agregado al carrito!"});
        } else {
            res.status(400).send({status:"error", message:"Error! No se pudo agregar el Producto al Carrito!"});
        }
    } else {
        res.status(400).send({status:"error", message:"Error! ID inexistente!"});
    }
});

export default cartsRouter;