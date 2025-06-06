import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get all posts
async function getPosts(req, res) {
  try {
    console.log("Fetching all posts...");

    const posts = await prisma.post.findMany({
      include: {
        recruiter: {
          include: {
            user: true,
          },
        },
        applications: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`Found ${posts.length} posts`);
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Create a new post
async function createPost(req, res) {
  try {
    console.log("Creating new post:", req.body);

    const {
      recruiterId,
      companyName,
      jobTitle,
      jobDescription,
      qualification,
      experience,
      stipend,
      requiredSkills,
      location,
      jobType,
    } = req.body;

    // ✅ Confirm recruiter exists
    const recruiterExists = await prisma.recruiter.findUnique({
      where: { id: recruiterId },
    });

    if (!recruiterExists) {
      return res
        .status(400)
        .json({ message: "Invalid recruiterId: recruiter not found" });
    }

    const post = await prisma.post.create({
      data: {
        recruiterId,
        companyName,
        jobTitle,
        jobDescription,
        qualification,
        experience,
        stipend,
        requiredSkills,
        location,
        jobType,
      },
      include: {
        recruiter: true,
        applications: true,
      },
    });

    console.log("Post created successfully:", post.id);
    return res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

