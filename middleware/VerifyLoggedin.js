import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function verifyLoggedin(request,response,next){
    const token = request.body.token || request.query.token || request.headers["x-access-token"]||request.headers.authorization;

    if (!token) {
        return response.send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    } catch (err) {
        return response.status(401).send("Invalid Token");
    }

}