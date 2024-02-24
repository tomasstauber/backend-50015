import { productsModel } from "../models/products.model.js";

class ProductManager {

    async createProduct({ title, description, price, code, stock, category, thumbnail }) {
        try {
            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Debe completar todos los campos!");
                return;
            }
            const existProduct = await productsModel.findOne({ code: code });
            if (existProduct) {
                console.log("El código proporcionado ya está en uso!");
                return;
            }
            const newProduct = new productsModel({
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                thumbnail: thumbnail || []
            })
            await newProduct.save();
        } catch (error) {
            console.log("Ha ocurrido un error al agregar el producto! ", error.message);
            throw error;
        }
    }

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page -1) * limit;
            let queryOptions = {};
            if(query) {
                queryOptions = {category:query};
            }
            const sortOptions = {};
            if(sort) {
                if(sort === "asc" || sort === "desc"){
                    sortOptions.price = sort === "asc" ? 1 : -1;
                }
            }
             const products = await productsModel
             .find(queryOptions)
             .sort(sortOptions)
             .skip(skip)
             .limit(limit);
             const totalProducts = await productsModel.countDocuments(queryOptions);
             const totalPages = Math.ceil(totalProducts / limit);
             const hasPrevPage = page > 1;
             const hasNextPage = page < totalPages;
             return {
                docs: products,
                totalPages,
                prevPage : hasPrevPage ? page -1 : null,
                nextPage :hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
             }
        } catch (error) {
            console.log("Ha ocurrido un error al obtener los productos! ", error.message);
            throw error;
        }
    };

    async updateProduct(id, product) {
        try {
                if (await this.getProductById(id)) {
                    await productsModel.updateOne({ _id: id }, product);
                    console.log("El producto se actualizó correctamente!");
                    return true;
                }
            return false;
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el producto! ", error.message);
            throw error;
        }
    }

    async updateProduct(pid, productUp) {
        try {
            const updateProduct = await productsModel.findByIdAndUpdate(pid, productUp);
            if(!updateProduct) {
                console.log("No se encontró el producto!");
                return null;
            }
            console.log("El producto se actualizó correctamente!");
            return updateProduct;
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el producto! ", error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(id);
            if(!deleteProduct){
                console.log("No se encontró el producto!");
                return null;
            }
            console.log("El producto se eliminó correctamente!");
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar el producto!", error.message);
            throw error;
        }
    }


    async getProductById(pid) {
        try {
            const product = await productsModel.findById(pid);
            if(!product) {
                console.log("No se encontró el producto!");
                return null;
            }
            return product;
        } catch (error) {
            console.log("Ha ocurrido un error al buscar el Id!", error.message);
            throw error;
        }
    }
}

export default ProductManager;