import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getRecruiter(id, res);
    case "PUT":
      return updateRecruiter(id, req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get a recruiter profile
async function getRecruiter(id, res) {
  try {
    console.log("Fetching recruiter with ID:", id);

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: id },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
        posts: {
          include: {
            applications: true,
          },
        },
      },
    });

    // if (!recruiter) {
    //   console.log("Recruiter not found for ID:", id);
    //   return res.status(404).json({ message: "Recruiter not found" });
    // }
    // if (!recruiter) {
    //   return;
    //   console.log("Recruiter not found for ID:", id);
    //   return res.status(200).json({ redirectTo: "/sip" });
    // }
    
    if (!recruiter) {
      return res.status(401).json({
        error: "RECRUITER_NOT_FOUND",
        message: "To access recruiter dashboard, kindly login as recruiter",
        redirectTo: "/sip/login",
      });
    }
    

    console.log("Recruiter found:", recruiter.companyName);
    return res.status(200).json(recruiter);
  } catch (error) {
    console.error("Error fetching recruiter:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Update a recruiter profile
async function updateRecruiter(id, req, res) {
  try {
    const { companyName, address, websiteUrl } = req.body;

    const recruiter = await prisma.recruiter.update({
      where: { userId: id },
      data: {
        companyName,
        address,
        websiteUrl,
      },
    });

    return res.status(200).json(recruiter);
  } catch (error) {
    console.error("Error updating recruiter:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
