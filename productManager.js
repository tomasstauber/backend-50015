const fs = require("fs").promises;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.prevId = 0;
    }

    async addProduct(newObjet) {
        let { title, description, price, thumbnail, code, stock } = newObjet;

        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Error! Todos los campos son obligatorios!");
            return;
        };

        for (const product of this.products) {
            if (product.code === code) {
                console.log("El código proporcionado ya está en uso!")
            }
        };

        this.prevId++;

        const newProduct = {
            id: this.prevId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        await this.saveProduct(this.products);
    }

    getProducts() {
        console.log(this.products);
    }

    async getProductsById(id) {
        try {
            const arrayPorducts = await this.readFile();
            const result = arrayPorducts.find(item => item.id === id);
            if (!result) {
                console.log("No se encontró ningún producto!");
            } else {
                console.log("Producto encontrado!");
                return result;
            }
        } catch (error) {
            console.log("Ha ocurrido un  error al leer el archivo", error);
        }
    }

    async readFile() {
        try {
            const result = await fs.readFile(this.path, "utf-8");
            const arrayPorducts = JSON.parse(result);
            return arrayPorducts;
        } catch (error) {
            console.log("Ha ocurrido un error al leer el archivo!");
        }
    }

    async saveProduct(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log("Ha ocurrido un error al guardar el archivo!", error);
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayPorducts = await this.readFile();
            const index = arrayPorducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayPorducts.splice(index, 1, productoActualizado);
                await this.saveProduct(this.products);
            } else {
                console.log("No se encontró ningún producto!");
            }
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el producto!");
        }
    }
}

const PM = new ProductManager("./products.json");

PM.getProducts();

const producto1 = {
    title: "Producto1",
    description: "producto de prueba",
    price: 100,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 10
}

PM.addProduct(producto1);

const producto2 = {
    title: "Producto2",
    description: "producto de prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 10
}

PM.addProduct(producto2);

const producto3 = {
    title: "Producto3",
    description: "producto de prueba",
    price: 300,
    thumbnail: "sin imagen",
    code: "abc125",
    stock: 10
}

PM.addProduct(producto3);

PM.getProducts();

async function findByID() {
    const result = await PM.getProductsById(2);
    console.log(result);
}

findByID();

const producto4 = {
    id: 1,
    title: "Producto4salsa",
    description: "actualización de producto",
    price: 400,
    //thumbnail: "sin imagen",
    code: "abc123",
    stock: 10
}

async function pruebaActualización() {
    await PM.updateProduct(1, producto4);
}

pruebaActualización();