import NormalAdmin from "../models/NormalAdmin.js";
import GamaAdmin from "../models/GamaAdmin.js";
import dbConnect from "../lib/dbConnect.js";

export default async function verifyGammaAdmin(request,response,next){
    await dbConnect();
    let finder=await GamaAdmin.find({
        email : request.headers.email
    })

    if(finder.length > 0){
        next()
    }else{
        response.send("Not a gamma admin")
    }
}