import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    // Check if an admin exists with the given email
    const admin = await prisma.admin.findUnique({
      where: { email: email },
    });

    // If an admin with the given email exists, return true, otherwise false
    if (admin) {
      return res.status(200).json({ isAdmin: true });
    } else {
      return res.status(200).json({ isAdmin: false });
    }
  } catch (error) {
    console.error("Error checking admin email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking the admin email" });
  }
}
