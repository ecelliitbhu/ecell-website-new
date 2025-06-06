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
    // Check if already exists
    const existing = await prisma.student.findUnique({
      where: { userId },
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const newStudent = await prisma.student.create({
      data: {
        userId,
        name: "",
        rollNo: "",
        branch: "",
        cpi: 0,
        courseType: "",
        year: 1,
        linkedinUrl: "",
        githubUrl: "",
        resumeUrl: "",
      },
    });

    return res.status(201).json(newStudent);
  } catch (err) {
    console.error("Failed to create student:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
