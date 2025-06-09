import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function verifySuperAdmin(request,response,next){
    const token = request.headers.superadmintoken;
    if (!token) {
        return response.send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("authorisation successful")
        return next();
    } catch (err) {
        return response.status(401).send("Invalid Token");
    }

}