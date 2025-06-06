import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nc from "next-connect";
import dbConnect from "../../lib/dbConnect.js";
import SuperAdmin from "../../models/SuperAdmin.js";

const router = nc();
dotenv.config();

router.post("/api/adminLogin", async (request, response) => {
  await dbConnect();
  var isLoggedIn = false;

  let finder = await SuperAdmin.find({
    email: request.body.email,
  });

  for (let i = 0; i < finder.length; i++) {
    if (request.body.password===finder[i].password) {
      isLoggedIn = true;
      break;
    }
  }

  if (isLoggedIn) {
    let email = request.body.email;

    //JWT AUth Token
    const token = jwt.sign({ user: email }, process.env.SECRET_KEY);
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
