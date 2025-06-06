import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Startup from "../../../models/Startup.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyEmail from "../../../middleware/VerifyEmail.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import verifySuperAdmin from "../../../middleware/VerifySuperAdmin.js";
import multer from "multer";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
var router = express();
// const router = nc();
// parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// router.use(bodyParser.json());

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

// router.use(express.static(__dirname + '/public'));
// router.use('/uploads', express.static('uploads'));
router.use((req, res, next) => {
  if (!fs.existsSync("./public/uploads")) {
    fs.mkdirSync("./public/uploads", { recursive: true }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("New directory successfully created.");
      }
    });
  }
  next();
});

// /customSignup
router.post(
  "/api/startup",
  [verifySuperAdmin, upload.single("avatar")],
  async (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString("base64");
    var final_img = {
      contentType: req.file.mimetype,
      data: new Buffer(encode_img, "base64"),
    };
    console.log(final_img);
    fs.rmSync("./public/uploads", { recursive: true, force: true });
    await dbConnect();
    let name = req.body.name;
    let website = req.body.website;
    let description = req.body.description;
    let domain = req.body.domain;
    let founders = [
      { founder: req.body.founder1, linkedin: req.body.linkedin1 },
      { founder: req.body.founder2, linkedin: req.body.linkedin2 },
      { founder: req.body.founder3, linkedin: req.body.linkedin3 },
      { founder: req.body.founder4, linkedin: req.body.linkedin4 },
      { founder: req.body.founder5, linkedin: req.body.linkedin5 },
    ];
    let status = req.body.status;
    let year = req.body.year;
    try {
      let newStartup = new Startup({
        Name: name,
        website: website,
        founders: founders,
        currentStatus: status,
        yearOfGraduation: year,
        domain: domain,
        description: description,
        avatar: final_img,
      });
      await newStartup.save();
      res.json({
        message: "Startup Registered Successfully",
        startup: req.body.founders,
      });
    } catch (error) {
      res.send(error);
    }
  }
);

router.get("/api/startup", async (request, response) => {
  await dbConnect();
  try {
    let finder = await Startup.find();
    response.status(201).send(finder);
  } catch (error) {
    response.send("Some error happened");
  }
});

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
