"use client";

import { useState } from "react";
import Head from "next/head";
import Nav from "../../../components/navbar/NavLayout";
import { firestoreDB } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    year: "",
    course: "",
    branch: "",
    selectedTeams: [], 
    commitmentHours: "",
    whyJoin: "",
    previousExperience: "",
    nonAcademicEngagements: "",
    otherPoints: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferenceCounter, setPreferenceCounter] = useState(0);

  const years = ["2nd Year", "3rd Year", "4th Year", "5th Year"];
  const courses = ["BTech", "BArch", "IDD"];

  const branches = [
    "Architecture, Planning and Design",
    "Biomedical Engineering",
    "Ceramic Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Pharmaceutical Engineering and Technology",
    "Biochemical Engineering",
    "Industrial Chemistry",
    "Mathematical Sciences",
    "Engineering Physics",
    "Chemistry",
    "Material Science and Technology",
  ];

  const teams = [
    {
      id: "design",
      name: "Design Team",
      description:
        "The Design Team at E-Cell is responsible for creating all visual graphics, including the logo, website, posters, and social media graphics, ensuring a cohesive and engaging visual identity for the organisation.",
    },
    {
      id: "sap",
      name: "SAP Team",
      description:
        "The Student Assistance Program (SAP) team of E-Cell IIT BHU supports student startups by providing essential resources, connections, and guidance to help turn their ideas into reality.",
    },
    {
      id: "tech",
      name: "Tech Team",
      description:
        "The tech team of E-Cell IIT(BHU) manages the digital infrastructure, including website development, website maintenance, and technical support for all events and initiatives.",
    },
    {
      id: "branding",
      name: "Branding Team",
      description:
        "Branding team is dedicated towards crafting a compelling and unique identity of E-Cell, enhancing our presence and fostering a strong, cohesive image. We blend creativity with strategy to engage our community and amplify our message.",
    },
    {
      id: "relations",
      name: "Relations Team",
      description:
        "Relations Team at E-Cell cultivates partnerships with industry leaders, investors, and VCs, fostering innovation, growth, and enriching the events with sponsors and esteemed speakers.",
    },
    {
      id: "strategy",
      name: "Strategy and Outreach",
      description:
        "The Strategy and Outreach Team of E-Cell drives entrepreneurial growth through robust partnerships with like minded institutions and organisations. We also develop and implement strategies to amplify E-Cell's online presence and engage with the broader community to raise awareness about E-Cell and its initiatives.",
    },
    {
      id: "innovation",
      name: "Innovation and Incubation Team",
      description:
        "The INI Vertical ensures seamless coordination between IIT BHU Incubators and E-Cell by handling all the official tasks. We are also responsible for coordinating with PG students facilitating commercialisation of their researches.",
    },
    {
      id: "events",
      name: "Events Team",
      description:
        "Events Team is responsible for handling and organizing all the events, webinars, and workshops, conducted by E-Cell during the course of the session.",
    },
    {
      id: "video",
      name: "Video Editing Team",
      description:
        "Responsible for creating, editing, and producing engaging video content for E-Cell events, promotions, and social media channels, thereby creating an impact on audience.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTeamSelection = (teamId, isChecked) => {
    setFormData((prev) => {
      let newSelectedTeams = [...prev.selectedTeams];

      if (isChecked) {
        // Check if we already have 3 selections
        if (newSelectedTeams.length >= 3) {
          alert("You can select maximum 3 teams only!");
          return prev;
        }

        // Add new team with next preference number
        const newPreference = newSelectedTeams.length + 1;
        newSelectedTeams.push({
          teamId,
          preference: newPreference,
          order: preferenceCounter + 1,
        });
        setPreferenceCounter(preferenceCounter + 1);
      } else {
        // Remove the team
        const removedTeam = newSelectedTeams.find(
          (team) => team.teamId === teamId
        );
        newSelectedTeams = newSelectedTeams.filter(
          (team) => team.teamId !== teamId
        );

        // Reorder preferences for remaining teams
        newSelectedTeams = newSelectedTeams
          .sort((a, b) => a.order - b.order) // Sort by original selection order
          .map((team, index) => ({
            ...team,
            preference: index + 1, // Reassign preferences 1, 2, 3
          }));
      }

      return {
        ...prev,
        selectedTeams: newSelectedTeams,
      };
    });
  };

  const getTeamPreference = (teamId) => {
    const team = formData.selectedTeams.find((t) => t.teamId === teamId);
    return team ? team.preference : null;
  };

  const getPreferenceText = (preference) => {
    switch (preference) {
      case 1:
        return "First preference";
      case 2:
        return "Second preference";
      case 3:
        return "Third preference";
      default:
        return "";
    }
  };

  const getPreferenceColor = (preference) => {
    switch (preference) {
      case 1:
        return "text-red-600 font-semibold";
      case 2:
        return "text-orange-600 font-semibold";
      case 3:
        return "text-blue-600 font-semibold";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.course.trim()) newErrors.course = "Course is required";
    if (!formData.branch.trim()) newErrors.branch = "Branch is required";
    if (formData.selectedTeams.length === 0)
      newErrors.selectedTeams = "Please select at least one team";
    if (!formData.commitmentHours.trim())
      newErrors.commitmentHours = "Commitment hours is required";
    if (!formData.whyJoin.trim())
      newErrors.whyJoin = "Please explain why you want to join";
    if (!formData.previousExperience.trim())
      newErrors.previousExperience = "Please describe your previous experience";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (
      formData.phoneNumber &&
      !phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))
    ) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare application data
      const applicationData = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        year: formData.year,
        course: formData.course,
        branch: formData.branch,
        selectedTeams: formData.selectedTeams,
        commitmentHours: formData.commitmentHours,
        whyJoin: formData.whyJoin,
        previousExperience: formData.previousExperience,
        nonAcademicEngagements: formData.nonAcademicEngagements,
        otherPoints: formData.otherPoints,
        submittedAt: new Date().toISOString(),
      };

      // Push to Firestore
      await addDoc(collection(firestoreDB, "applications"), applicationData);

      alert("Application submitted successfully! We will contact you soon.");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        year: "",
        course: "",
        branch: "",
        selectedTeams: [],
        commitmentHours: "",
        whyJoin: "",
        previousExperience: "",
        nonAcademicEngagements: "",
        otherPoints: "",
      });
      setPreferenceCounter(0);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        "Error submitting application. Please try again.\n" + error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>E-Cell Team Application Form</title>
        <meta name="description" content="Apply for E-Cell IIT BHU Team" />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>

      <div
        className="min-h-screen bg-gradient-to-br bg-white"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div className="bg-white">
          <Nav />

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Application Form */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Registrations Closed !!
              </h3>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
