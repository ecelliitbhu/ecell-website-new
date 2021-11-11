import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Opportunity from '../../../models/Opportunity.js'
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import nc from "next-connect";
import dbConnect from '../../../lib/dbConnect.js'
// import verifyEmail from "../middleware/VerifyEmail.js"

const router=nc();

// /customSignup
router.post('/api/opportunity',verifyLoggedin,async (req, res)=> {
    await dbConnect()
    try {
        let companyName = req.body.companyName;
        let linkedinurl=req.body.linkedinurl;
        let websiteurl=req.body.websiteurl;
        let opportunityDescription=req.body.opportunityDescription;
        let perks=req.body.perks;
        let skillsRequired=req.body.skillsRequired;
        let stipend=req.body.stipend;
        let mode=req.body.mode;
        let numberOfAvailableSeats=req.body.numberOfAvailableSeats;
        let duration=req.body.duration;
        let newUser = new Opportunity({
            companyName : companyName,
            linkedinurl :linkedinurl,
            websiteurl : websiteurl,
            opportunityDescription:opportunityDescription,
            perks: perks,
            skillsRequired: skillsRequired,
            stipend: stipend,
            mode: mode,
            numberOfAvailableSeats: numberOfAvailableSeats,
            duration: duration
        });

        await newUser.save();
        res.send("Opportunity Registered Successfully");

    } catch (error) {
        res.send(error);
    }
});


router.get("/api/opportunity",verifyLoggedin,async (request,response) =>  {
    await dbConnect()
    try {
        let finder=await Opportunity.find()
        response.status(201).send(finder)
    } catch (error) {
        response.send("Some error happened")
    }
})

router.put("/api/opportunity",verifyLoggedin,async (req,res) =>  {
    await dbConnect()
    try {       
        let finder=await Opportunity.find({
            companyName : req.headers.companyname,
        })
        // console.log("hkj",req.body);
        if(finder.length > 0){
            await Opportunity.updateOne(
                {
                    companyName : req.headers.companyname,
                    _id: req.body.id
                },
                {
                    $set: {
                        companyName : req.body.companyName,
                        linkedinurl :req.body.linkedinurl,
                        websiteurl : req.body.websiteurl,
                        opportunityDescription:req.body.opportunityDescription,
                        perks: req.body.perks,
                        skillsRequired: req.body.skillsRequired,
                        stipend: req.body.stipend,
                        mode: req.body.mode,
                        numberOfAvailableSeats: req.body.numberOfAvailableSeats,
                        duration: req.body.duration
                    } 
                }
            );
            res.status(201).send("User updated")
        }else{res.status(404).send("User not found")}
    } catch (error) {
        res.send("Some error happened")
    }
})

router.delete("/api/opportunity",verifyLoggedin,async (req,res) =>  {
    await dbConnect()
    try {       
        let finder=await Opportunity.find({
            companyName : req.headers.companyName,
        })
        if(finder.length > 0){
            await Opportunity.findOneAndDelete(
                {
                    email : req.headers.companyName,
                    _id: req.body.id,
                },
                
            );
            res.status(201).send("User deleted")
        }else{res.status(404).send("User not found")}
    } catch (error) {
        res.send("Some error happened")
    }
})

export default router