import express from "express";
import CartManager from "../dao/cartManagerDB.js"

const cartsRouter = express.Router();
const CM = new CartManager();


//crear carrito
cartsRouter.post("/carts", (req, res) => {
    try {
        if (CM.createCart()) {
            res.send({ status: "ok", message: "El Carrito se creó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo crear el Carrito!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.get("/carts", async (req, res) => {
    try {
        const carts = await CM.getCarts();
        if (carts) {
            res.send({ carts });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.get("/carts/:cid", (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = CM.getCart(cid);
        if (cart) {
            res.json({ cart });
        } else {
            res.status(400).send({ status: "error", message: "Error! ID inexistente!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.post("/carts/:cid/products/:pid", (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = CM.getCart(cid);
        if (cart) {
            if (CM.addToCart(cid, pid)) {
                res.send({ status: "ok", message: "Producto agregado al carrito!" });
            } else {
                res.status(400).send({ status: "error", message: "Error! No se pudo agregar el Producto al Carrito!" });
            }
        } else {
            res.status(400).send({ status: "error", message: "Error! ID inexistente!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.put("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        const result = await CM.updateQuantityProductCart(cid, pid, quantity);
        if (result) {
            res.send({ status: "Ok", message: "Producto actualizado correctamente!" });
        } else {
            res.status(400).send({ status: "Error", message: "Ha ocurrido un error al actualizar el producto!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor! " + error.message);
        throw error;
    }
});


cartsRouter.put("/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const products = req.body.products;
        const result = await CM.updateProducts(cid, products);
        if (result) {
            res.send({ status: "Ok", message: "Productos actualizados correctamente!" });
        } else {
            res.status(400).send({ status: "Error", message: "Ha ocurrido un error al actualizar los productos!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.delete("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await CM.deleteProductCart(cid, pid);
        if (result) {
            res.send({ status: "Ok", message: "Producto eliminado correctamente!" });
        } else {
            res.status(400).send({ status: "Error", message: "Ha ocurrido un error al eliminar el producto!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});


cartsRouter.delete("/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const result = await CM.deleteProductsCart(cid);
        if (result) {
            res.send({ status: "Ok", message: "Productos eliminados correctamente!" });
        } else {
            res.status(400).send({ status: "Error", message: "Ha ocurrido un error al eliminar los productos!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});

export default cartsRouter;