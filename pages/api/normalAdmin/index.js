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
import dbConnect from "../../../lib/dbConnect.js";

const router = nc();

router.get(
  "/api/normalAdmin",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await NormalAdmin.find();
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.put("/api/normalAdmin", [verifyLoggedin], async (req, res) => {
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
  "/api/normalAdmin",
  [verifyLoggedin, verifyAdmin],
  async (req, res) => {
    await dbConnect();
    try {
      let finder = await NormalAdmin.find({
        email: req.body.email,
      });
      if (finder.length > 0) {
        await NormalAdmin.findOneAndDelete({
          email: req.body.email,
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
