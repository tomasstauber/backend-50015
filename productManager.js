class ProductManager {
    constructor(){
        this.products = [];
        this.prevId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if(!(title && description && price && thumbnail && code && stock)) {
            console.log("Error! Todos los campos son obligatorios!");
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
    }

    getProducts() {
        return this.products;
    }

    getProductsById(productId) {
        for (const product of this.products){
            if (product.id === productId){
                console.log("Resultado de búsqueda por ID:")
                return product;
            } else {
                console.log("Ningún producto coincide con ese Id!")
            }
        }
    }
}

const PM = new ProductManager();

PM.addProduct(
    "Producto de prueba",
    "Esto es un producto de prueba",
    100,
    "Sin imagen",
    "123",
    10
);

//Producto con el mismo codigo para probar la validación.
PM.addProduct(
    "Producto de prueba 1",
    "Esto es un producto de prueba",
    200,
    "Sin imagen",
    "123", 
    20
);

const result = PM.getProducts();
for (const product of result) {
    console.log(product);
};

const productId = 1;
const resultId = PM.getProductsById(productId);
console.log(`Búsqueda de ID: ${productId} :`, resultId);