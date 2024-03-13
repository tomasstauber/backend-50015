import jwt from "jsonwebtoken";

const privateKey = "secretToken";

const generateToken = (user) => {
    const token = jwt.sign(user, privateKey, {expiresIn: "24h"});
    return token;
};

export default generateToken;