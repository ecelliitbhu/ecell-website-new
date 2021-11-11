import verifyLoggedin from '../../../middleware/VerifyLoggedin.js';
import Opportunity from '../../../models/Opportunity.js';
import Student from '../../../models/Student.js';
import Response from '../../../models/Response.js';
import nc from "next-connect";
import dbConnect from '../../../lib/dbConnect.js'

const router=nc();

router.post('/api/response',[verifyLoggedin],async (req, res)=> {
    await dbConnect()
    try{
        Student.findOne({
            email : req.headers.email
        },async function(err,student){
            Opportunity.findOne({
                _id : req.body.id
            },async function(err,opportunity){
                // console.log("opportunity=",opportunity);
                let newResponse = new Response({
                    submission : {
                        originalFileName : req.body.originalFileName,
                        uploadedFileName : req.body.uploadedFileName
                    },
                    Student : student
                })
                // console.log("new Response=",newResponse);
                newResponse.save()
                opportunity.responses.push(newResponse)
                opportunity.save();
                student.Postbystudent.push(opportunity);
                student.save();
            })
        })
        res.send("Posted Successfully")
    }catch(err){
        res.send(err)
    }
})

// {
//     "googleId": "Sample Dummy",
//     "companyName": "Sachin ki company",
//     "firstName": "Sachin ka Startup",
//        "lastName": "Tendulkar",
//        "phone": 9100223,
//        "email": "SachinStartsAgain@gmail.com",
//        "linkedin": "Sample linkedin",
//        "github": "Sample Github",
//        "password": "1234",
//        "confirmPassword": "1234",
//        "description": "Description 1",
//        "originalFileName": "lala",
//        "uploadedFileName": "jjlhl",
//        "PostBystudent": [],
//        "landingPageLink": "www.sachinKaStartup.com",
   
//        "linkedinurl": "nurl",
//        "websiteurl": "wurl",
//        "opportunityDescription": "opdescription",
//        "perks": "mazza hi mazza",
//        "skillsRequired": ["django", "js"],
//        "stipend": 1000,
//        "duration": 2,
//        "mode": "online",
//        "numberOfAvailableSeats": 12
//    }

// "id": "6158935a0cb5f1060db41bb4",
//  "googleId": "Sample Dummy",
//  "companyName": "Sachin ki company",
//  "firstName": "Sachin",
//     "lastName": "Tendulkar",
//     "phone": 9100223,
//     "email": "Sachin@gmail.com",
//     "linkedin": "Sample linkedin",
//     "github": "Sample Github",
//     "password": "1234",
//     "confirmPassword": "1234",
//     "description": "Description 1",
//     "originalFileName": "lala",
//     "uploadedFileName": "jjlhl",
//     "PostBystudent": [],
//     "landingPageLink": "www.sachinKaStartup.com"

export default router
