import express from "express";
import ProductManager from "./src/dao/productManager.js";

//Configuración del servidor
const app = express();
const PORT = 8080;
const hhtpServer = app.listen(PORT, () => {
    console.log("Servidor activo en el puerto: " + PORT);
});

//Nueva instancia de ProductManager
const PM = new ProductManager();

//Rutas
app.get("/", (req, res) => {
    res.send("Bienvenidos")
});

app.get("/products", async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        const products = await PM.getProducts();
        if (limit) {
            let arrayProducts = [...products];
            const limitedProducts = arrayProducts.slice(0, limit);
            return res.send(limitedProducts);
        }
        return res.json(products);
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor");
    }
});


app.get("/products/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const products = await PM.getProducts();
        const existProduct = products.find(product => product.id === id);
        console.log(existProduct)
        const response = existProduct ? existProduct : { error: `No se encontró ningún producto con el ID: ${id}` };
        res.status(existProduct ? 200 : 400).send(response);
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor");
    }
});