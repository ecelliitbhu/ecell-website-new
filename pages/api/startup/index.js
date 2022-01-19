import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Startup from "../../../models/Startup.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyEmail from "../../../middleware/VerifyEmail.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import multer from "multer";
import fs from "fs";

const router = nc();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const uploadMiddleware = upload.array("files");

// /customSignup
router.post(
  "/api/startup",
  [verifyLoggedin, verifyEmail, uploadMiddleware],
  async (req, res) => {
    var img = fs.readFileSync(req.files[0].path);
    var encode_img = img.toString("base64");
    var final_img = {
      contentType: req.files[0].mimetype,
      data: new Buffer(encode_img, "base64"),
    };
    console.log(final_img);
    await dbConnect();
    try {
      let email = req.body.email;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;
      let Name = req.body.Name;
      let phone = req.body.phone;
      let linkedin = req.body.linkedin;
      let github = req.body.github;
      let description = req.body.description;
      let landingPageLink = req.body.landingPageLink;
      let newUser = new Startup({
        email: email,
        password: password,
        Name: Name,
        phone: phone,
        linkedin: linkedin,
        github: github,
        description: description,
        landingPageLink: landingPageLink,
        avatar: final_img,
      });

      if (password === confirmPassword) {
        await newUser.save();
        res.send("Startup Registered Successfully");
      } else {
        res.send("password mismatch");
      }
    } catch (error) {
      res.send(error);
    }
  }
);

router.get(
  "/api/startup",
  [verifyLoggedin, verifyEmail],
  async (request, response) => {
    console.log("Hello");
    await dbConnect();
    try {
      let finder = await Startup.find();
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.put("/api/startup", [verifyLoggedin, verifyEmail], async (req, res) => {
  await dbConnect();
  try {
    let finder = await Startup.find({
      email: req.headers.email,
    });
    if (finder.length > 0) {
      await Startup.updateOne(
        {
          email: req.headers.email,
        },
        {
          $set: {
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            Name: req.body.Name,
            phone: req.body.phone,
            linkedin: req.body.linkedin,
            github: req.body.github,
            landingPageLink: req.body.landingPageLink,
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
  "/api/startup",
  [verifyLoggedin, verifyEmail],
  async (req, res) => {
    await dbConnect();
    try {
      let finder = await Startup.find({
        email: req.headers.email,
      });
      if (finder.length > 0) {
        await Startup.findOneAndDelete({
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

export default router;
