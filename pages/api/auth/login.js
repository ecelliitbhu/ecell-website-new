import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    // Fetch user and all possible role relations
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        recruiter: true,
        ambassador: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Collect roles user has
    const roles = [];
    if (user.student) roles.push("STUDENT");
    if (user.recruiter) roles.push("RECRUITER");
    if (user.ambassador) roles.push("AMBASSADOR");

    if (roles.length === 0) {
      return res.status(401).json({ message: "User has no assigned roles" });
    }

    const roleData = {};
    if (user.student) roleData.student = user.student;
    if (user.recruiter) roleData.recruiter = user.recruiter;
    if (user.ambassador) roleData.ambassador = user.ambassador;

    return res.status(200).json({
      id: user.id,
      email: user.email,
      roles,
      roleData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
