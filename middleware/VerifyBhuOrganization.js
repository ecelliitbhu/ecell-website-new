import Student from "../models/Student.js"
import Startup from "../models/Startup.js"

export default function verifyBhuOrganization(request,response,next){
    const email=request.body.email;

    let arr=email.split("@");

    if(arr[1]=="iitbhu.ac.in" || arr[1]=="itbhu.ac.in"){
        // return response.send("IIT BHU STUDENT");
        return next();
    }
    else if(arr[1]=="@ecell.iitbhu.ac.in"){
        // return response.send("ADMIN OF ECELL IIT BHU");
        return next();
    }
}