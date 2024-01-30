import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
});

export const messageModel = mongoose.model(messagesCollection, messagesSchema);