import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

cartsSchema.pre('findOne', function (next) {
    this.populate('products.product', '_id title price');
    next();
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);