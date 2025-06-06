import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, email } = req.body;

  if (!userId || !email) {
    return res.status(400).json({ message: "Missing userId or email" });
  }

  try {
    const existing = await prisma.recruiter.findUnique({
      where: { userId },
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const newRecruiter = await prisma.recruiter.create({
      data: {
        userId,
        companyName: "",
        websiteUrl: "",
        address: "",
      },
    });

    return res.status(201).json(newRecruiter);
  } catch (err) {
    console.error("Failed to create recruiter:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
