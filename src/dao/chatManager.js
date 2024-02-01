import  messageModel  from "../models/messages.model.js"

class chatManager {
    async getMessages() {
        return await messageModel.find().lean();
    }
    async createMessage(message) {
        return await messageModel.create(message);
    }
}

export default chatManager;