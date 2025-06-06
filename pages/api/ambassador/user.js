import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const userData = await prisma.campusAmbassador.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        collegeName: true,
        collegeYear: true,
        phone: true,
        points: true,
        referrals: true,
      },
    });

    if (userData) {
      return res.status(200).json(userData);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
}
