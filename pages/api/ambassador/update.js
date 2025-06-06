import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, name, collegeName, collegeYear, phone } = req.body;

  try {
    const updatedUser = await prisma.campusAmbassador.update({
      where: { id: id },
      data: {
        name: name,
        collegeName: collegeName,
        collegeYear: collegeYear,
        phone: phone,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Unable to update user" });
  }
}
