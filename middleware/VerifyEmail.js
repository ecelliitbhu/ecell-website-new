import Student from "../models/Student.js"
import Startup from "../models/Startup.js"
import NormalAdmin from "../models/NormalAdmin.js"
import GamaAdmin from "../models/GamaAdmin.js"
import dbConnect from "../lib/dbConnect.js";

export default async function verifyEmail(request,response,next){
    await dbConnect();
    let finder1=await Student.find({
        email : request.headers.email
    })

    let finder2=await NormalAdmin.find({
        email : request.headers.email
    })

    let finder3=await GamaAdmin.find({
        email : request.headers.email
    })

    let finder4=await Startup.find({
        email : request.headers.email
    })
    
    if(finder1.length === 0){
        next()
    }
    else if(finder2.length === 0){
        next()
    }
    else if(finder3.length === 0){
        next()
    }
    else if(finder4.length === 0){
        next()
    }
    else{
        response.status(404).send("Email already exists")
    }
}