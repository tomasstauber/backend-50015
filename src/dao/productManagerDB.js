import { productsModel } from "../models/products.model.js";

class ProductManager {

    async createProduct(product) {
        try {
            if (await this.validateCode(product.code)) {
                console.log("Ya existe un producto con este código!");
                return false;
            } else {
                await productsModel.create(product);
                console.log("El producto se ha creado correctamente!");
                return true;
            }
        } catch (error) {
            console.log("Ha ocurrido un error al agregar el producto", error.message);
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            if (this.validateId(id)) {
                if (await this.getProductById(id)) {
                    await productsModel.updateOne({ _id: id }, product);
                    console.log("El producto se actualizó correctamente!");
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el producto!", error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            if (this.validateId(id)) {
                if (await this.getProductById(id)) {
                    await productsModel.deleteOne({ _id: id });
                    console.log("El producto se eliminó correctamente!");
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar el producto!", error.message);
            throw error;
        }
    }

    /* async getProducts(params) {
        let {limit, page, query, sort} = params;
        limit = limit ? limit : 10;
        page = page ? page : 1;
        query = query || {};
        sort = sort ? sort == "asc" ? 1 : -1 : 0;

        let products = await productsModel.paginate(query, {limit: limit, page: page, sort: { price : sort }});

        let status = products ? "succes" : "error";

        let prevLink = products.hasPrevPage ? "hhtp://localhost:8080/api/products?limit=" + limit + "&page=" + products.prevPage : null;
        let nextLink = products.hasNextPage ? "hhtp://localhost:8080/api/products?limit=" + limit + "&page=" + products.nextPage : null;

        products = { status: status, payload: products.docs, prevPage: products.prevPage, nextPage: products.nextPage, page: products.page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, prevLink: prevLink, nextLink: nextLink };

        return products;
    } */

    async getProductById(id) {
        try {
            if (this.validateId(id)) {
                return await productsModel.findOne({ _id: id }).lean();
            }
        } catch (error) {
            console.log("Ha ocurrido un error al buscar el Id!", error.message);
            throw error;
        }
    }

    async validateCode(code) {
        return await productsModel.findOne({ code: code }) || false;
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }
}

export default ProductManager;