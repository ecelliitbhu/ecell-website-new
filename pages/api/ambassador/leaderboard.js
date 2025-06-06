import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const topUsers = await prisma.campusAmbassador.findMany({
      orderBy: {
        points: "desc",
      },
      take: 10,
      select: {
        name: true,
        points: true,
        collegeName: true,
      },
    });

    res.status(200).json(topUsers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching top user data" });
  }
}
