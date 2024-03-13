import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
});

export const usersModel = mongoose.model(usersCollection, userSchema);