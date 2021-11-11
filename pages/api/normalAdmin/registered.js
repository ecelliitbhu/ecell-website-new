import { createRequire } from "module";
const require = createRequire(import.meta.url);
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import verifyGammaAdmin from "../../../middleware/VerifyGammaAdmin.js";
import NormalAdmin from "../../../models/NormalAdmin.js";
import Blog from "../../../models/Blog.js";
import Schemes from "../../../models/Schemes.js";
import Student from "../../../models/Student.js";
import Startup from "../../../models/Startup.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import nc from "next-connect";
import dbConnect from '../../../lib/dbConnect.js'

const router=nc();

// /customSignup
router.post('/api/normalAdmin/registered/',[verifyLoggedin,verifyGammaAdmin],async (req, res)=> {
    await dbConnect()
    try {
        NormalAdmin.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            postByNormalAdmin : [
                new Blog({}),
                new Schemes({}),
                new Startup({})
            ]
        })

        Student.findByIdAndDelete({
            email : req.body.email
        })

        res.status(201).send("Admin added successfully")

    } catch (error) {
        res.send(error);
    }
});

export default router