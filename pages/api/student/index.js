import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Student from "../../../models/Student.js";
import Response from "../../../models/Response.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyEmail from "../../../middleware/VerifyEmail.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import { appendFile } from "fs";

const router = nc();

// /customSignup
router.post("/api/student", [verifyLoggedin, verifyEmail], async (req, res) => {
  await dbConnect();
  try {
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    let linkedin = req.body.linkedin;
    let github = req.body.github;
    let description = req.body.description;
    let newUser = new Student({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      linkedin: linkedin,
      github: github,
      description: description,
    });

    if (password === confirmPassword) {
      await newUser.save();
      res.send("User Registered Successfully");
    } else {
      res.send("password mismatch");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get(
  "/api/student",
  [verifyLoggedin, verifyEmail],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Student.find();
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.put("/api/student", [verifyLoggedin, verifyEmail], async (req, res) => {
  await dbConnect();
  try {
    let finder = await Student.find({
      email: req.headers.email,
    });
    if (finder.length > 0) {
      await Student.updateOne(
        {
          email: req.headers.email,
        },
        {
          $set: {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            linkedin: req.body.linkedin,
            github: req.body.github,
            description: req.body.description,
          },
        }
      );
      res.status(201).send("User updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.send("Some error happened");
  }
});

router.delete(
  "/api/student",
  [verifyLoggedin, verifyEmail],
  async (req, res) => {
    await dbConnect();
    try {
      let finder = await Student.find({
        email: req.headers.email,
      });
      if (finder.length > 0) {
        await Student.findOneAndDelete({
          email: req.headers.email,
          _id: req.body.id,
        });
        res.status(201).send("User deleted");
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.send("Some error happened");
    }
  }
);

// router.post('/PostInResponse/',async (req,res)=>{
//     try{
//         let finder=await Response.find({
//             companyName: req.headers.companyname
//         })
//         if(finder.length > 0){
//             let temp=finder.Student();
//             temp.push
//             await Response.updateOne(
//                 {
//                     companyName: req.headers.companyname,
//                     _id: req.body.id
//                 },
//                 {
//                     $set{

//                     }
//                 }
//             )
//         }
//     }

// })

export default router;
