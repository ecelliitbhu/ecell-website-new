import Student from "../../models/Student.js";
import NormalAdmin from "../../models/NormalAdmin.js";
import GamaAdmin from "../../models/GamaAdmin.js";
import Startup from "../../models/Startup.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import decrypt from "../../encryption/decrypt.js";
import nc from "next-connect";
import dbConnect from "../../lib/dbConnect.js";
import SuperAdmin from "../../models/SuperAdmin.js";

const router = nc();
dotenv.config();

router.post("/api/login", async (request, response) => {
  await dbConnect();
  var isLoggedIn = false;

  let finder1 = await Student.find({
    email: request.body.email,
  });
  let finder2 = await NormalAdmin.find({
    email: request.body.email,
  });
  let finder3 = await GamaAdmin.find({
    email: request.body.email,
  });
  let finder4 = await Startup.find({
    email: request.body.email,
  });

  for (let i = 0; i < finder1.length; i++) {
    if (await decrypt(request.body.password, finder1[i].password)) {
      isLoggedIn = true;
      break;
    }
  }
  for (let i = 0; i < finder2.length; i++) {
    if (await decrypt(request.body.password, finder2[i].password)) {
      isLoggedIn = true;
      break;
    }
  }
  for (let i = 0; i < finder3.length; i++) {
    if (await decrypt(request.body.password, finder3[i].password)) {
      isLoggedIn = true;
      break;
    }
  }
  for (let i = 0; i < finder4.length; i++) {
    if (await decrypt(request.body.password, finder4[i].password)) {
      isLoggedIn = true;
      break;
    }
  }

  if (isLoggedIn) {
    let firstName = request.body.firstName;
    let email = request.body.email;

    //JWT AUth Token
    const token = jwt.sign(
      { user: { firstName, email } },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400,
      }
    );
    response.status(200).send({
      message: "Logged In Successfully",
      token: token,
    });
  } else {
    response.send({
      message: "Invalid Credentials",
    });
  }
});

export default router;
