import NormalAdmin from "../models/NormalAdmin.js";
import GamaAdmin from "../models/GamaAdmin.js";
import dbConnect from "../lib/dbConnect.js";

export default async function verifyAdmin(request, response, next) {
  await dbConnect();
  let finder1 = await NormalAdmin.find({
    email: request.headers.email || null,
  });
  let finder2 = await GamaAdmin.find({
    email: request.headers.email || null,
  });

  if (finder1.length > 0 || finder2.length > 0) {
    return next();
  } else {
    response.status(404).send("Not an admin");
  }
}
