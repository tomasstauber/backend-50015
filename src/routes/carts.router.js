import express from "express";
import CartManager from "../dao/cartManagerDB.js";
import { cartsModel } from "../models/carts.model.js";

const cartsRouter = express.Router();
const CM = new CartManager();


//crear carrito
cartsRouter.post("/carts", async (req, res) => {
    try {
        const newCart = await CM.createCart();
        res.json(newCart);
    } catch (error) {
        console.log("Ha ocurrido un error al crear el carrito!", error);
        res.status(500).send({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});

cartsRouter.get("/carts", async (req, res) => {
    try {
        const cart = await cartsModel.find();
        if(!cart) {
            console.log("No hay carritos para mostrar!");
            return null;
        }
        res.json(cart)
    } catch (error) {
        console.log("Ha ocurrido un error al obtener los carritos!", error);
        res.status(500).send({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
})


cartsRouter.get("/carts/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            console.log("Ningún carrito coincide con ese Id!");
            return res.status(400).json({ error: "No se encontró el carrito!" });
        }
        return res.json(cart.products)
    } catch (error) {
        console.log("Ha ocurrido un error al obtener el carrito!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});


cartsRouter.post("/carts/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const updateCart = await CM.addToCart(cid, pid, quantity);
        res.json(updateCart.products)
    } catch (error) {
        console.log("Ha ocurrido un error al agregar el producto al carrito!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});


cartsRouter.put("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        const updateCart = await CM.updateQuantityProductCart(cid, pid, quantity);
        if (!updateCart) {
            return res.status(400).json({ error: "Ha ocurrido un error al actualizar el carrito!" });
        }
        res.json({ status: "success", message: "Cantidad actualizada correctamente!", updateCart });
    } catch (error) {
        console.log("Ha ocurrido un error al actualizar la q en el carrito!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor! " });
        throw error;
    }
});


cartsRouter.put("/carts/:cid", async (req, res) => {
    const cid = req.params.cid;
    const updateProducts = req.body;
    try {
        const updateCart = await CM.updateProducts(cid, updateProducts);
        res.json(updateCart);
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.delete("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const updateCart = await CM.deleteProductCart(cid, pid);
        res.json({status: "success", message: "Producto eliminado correctamente!", updateCart});
    } catch (error) {
    console.log("Ha ocurrido un error al eliminar el producto del carrito!", error);
        res.status(500).send("Ha ocurrido un error en el servidor!");
        throw error;
    }
});


cartsRouter.delete("/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const updateCart = await CM.deleteProductsCart(cid);
        res.json({status: "success", message: "Carrito eliminado correctamente!", updateCart});
    } catch (error) {
        console.log("Ha ocurrido un error al eliminar el carrito!", error);
        res.status(500).send("Ha ocurrido un error en el servidor!");
        throw error;
    }
});

export default cartsRouter;