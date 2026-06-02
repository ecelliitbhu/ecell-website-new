"use client";

import { useState } from "react";
import Head from "next/head";
import Nav from "../../../components/navbar/NavLayout";
import { initializeApp, getApp, getApps } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const personalFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_PERSONAL_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_PERSONAL_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PERSONAL_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PERSONAL_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PERSONAL_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_PERSONAL_FIREBASE_APP_ID
};

// Initialize a secondary Firebase app to avoid conflicting with the main website's Firebase
const personalApp = !getApps().find(app => app.name === 'personal')
  ? initializeApp(personalFirebaseConfig, 'personal')
  : getApp('personal');

const firestoreDB = getFirestore(personalApp);

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

  const years = ["2nd Year", "3rd Year"];
  const courses = ["BTech", "BArch", "IDD"];

  const branches = [
    "Architecture, Planning and Design",
    "Biochemical Engineering",
    "Biomedical Engineering",
    "Ceramic Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Engineering Physics",
    "Industrial Chemistry",
    "Material Science and Technology",
    "Mathematical Sciences",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Pharmaceutical Engineering and Technology",
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
      name: "Startup Assistance Program (SAP) team",
      description:
        "The Startup Assistance Program (SAP) team of E-Cell IIT BHU acts as a catalyst for innovation by not only helping students build startups, but also guiding them at every stage of their journey with the right mentorship, network, opportunities, and VC connections, driving the entire startup ecosystem on campus.",
    },
    {
      id: "tech",
      name: "Tech Team",
      description:
        "The Tech team of E-Cell IIT(BHU) manages the digital infrastructure, including website development, website maintenance, and technical support for all events and initiatives.",
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
      id: "sno",
      name: "Strategy and Outreach",
      description:
        "The Strategy and Outreach Team of E-Cell drives entrepreneurial growth through robust partnerships with like minded institutions and organisations. We also develop and implement strategies to amplify E-Cell's online presence and engage with the broader community to raise awareness about E-Cell and its initiatives.",
    },
    {
      id: "ini",
      name: "Innovation and Incubation Team",
      description:
        "The INI Vertical ensures seamless coordination between Incubators and E-Cell by handling all the official tasks. We are also responsible for coordinating with PG students facilitating commercialisation of their researches.",
    },
    {
      id: "events",
      name: "Events Team",
      description:
        "The Events Team oversees the end-to-end management of all events, webinars, and workshops organized by E-Cell, ensuring their smooth planning, coordination, and execution throughout the session.",
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

  const handleEmailBlur = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value && !emailRegex.test(e.target.value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
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
        return "text-orange-600 font-bold";
      case 2:
        return "text-orange-500 font-semibold";
      case 3:
        return "text-orange-400 font-medium";
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
      await addDoc(collection(firestoreDB, "applications_2026"), applicationData);

      // --- Google Sheets Integration via Apps Script ---
      try {
        const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

        if (scriptUrl) {
          // Extract individual preferences for Google Sheets columns
          const pref1 = applicationData.selectedTeams.find(t => t.preference === 1)?.teamId || "";
          const pref2 = applicationData.selectedTeams.find(t => t.preference === 2)?.teamId || "";
          const pref3 = applicationData.selectedTeams.find(t => t.preference === 3)?.teamId || "";

          const sheetData = {
            ...applicationData,
            preference1: pref1,
            preference2: pref2,
            preference3: pref3
          };
          delete sheetData.selectedTeams; // Remove the raw array

          await fetch(scriptUrl, {
            method: "POST",
            mode: "no-cors", // Bypasses CORS issues with Google Scripts
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sheetData),
          });
        }
      } catch (sheetError) {
        console.error("Error sending to Google Sheets:", sheetError);
        // We don't block the success alert since Firebase save succeeded
      }
      // -------------------------------------------------

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
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Application Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">E-Cell Team Expansion 2026</h2>
                <p className="text-gray-600">Fill out the form below to apply for the E-Cell team.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institute Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleEmailBlur}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="name.branch23@itbhu.ac.in"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData(prev => ({ ...prev, phoneNumber: val }));
                      if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: "" }));
                    }}
                    maxLength={10}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="9876543210"
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                </div>

                {/* Year, Course, Branch */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Year */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year}</p>}
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Course</option>
                      {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.course && <p className="mt-1 text-sm text-red-500">{errors.course}</p>}
                  </div>

                  {/* Branch */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.branch ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Branch</option>
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {errors.branch && <p className="mt-1 text-sm text-red-500">{errors.branch}</p>}
                  </div>
                </div>

                {/* Teams Selection */}
                <div className="mt-8">
                  <label className="block text-lg font-bold text-gray-900 mb-2">Select Teams (Max 3) *</label>
                  <p className="text-sm text-gray-500 mb-4">Select the teams you are interested in joining according to your preference.</p>

                  <div className="space-y-4">
                    {teams.map((team) => {
                      const isSelected = formData.selectedTeams.some(t => t.teamId === team.id);
                      const preference = getTeamPreference(team.id);

                      const selectedStyle = preference === 1
                        ? 'border-orange-500 bg-orange-100'
                        : preference === 2
                          ? 'border-orange-400 bg-orange-50'
                          : 'border-orange-300 bg-yellow-50';

                      return (
                        <div key={team.id} className={`p-4 border rounded-xl transition-all ${isSelected ? selectedStyle : 'border-gray-200 hover:border-orange-300'}`}>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 mt-1">
                              <input
                                type="checkbox"
                                id={team.id}
                                checked={isSelected}
                                onChange={(e) => handleTeamSelection(team.id, e.target.checked)}
                                className="h-5 w-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                              />
                            </div>
                            <div className="ml-3 flex-grow">
                              <label htmlFor={team.id} className="font-medium text-gray-900 cursor-pointer">
                                {team.name}
                              </label>
                              <p className="text-gray-500 text-sm mt-1">{team.description}</p>
                              {isSelected && (
                                <p className={`mt-2 text-sm ${getPreferenceColor(preference)}`}>
                                  {getPreferenceText(preference)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.selectedTeams && <p className="mt-2 text-sm text-red-500">{errors.selectedTeams}</p>}
                </div>

                {/* Commitment Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commitment (hours per week) *</label>
                  <input
                    type="number"
                    name="commitmentHours"
                    min="1"
                    max="20"
                    value={formData.commitmentHours}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.commitmentHours ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. 5"
                  />
                  {errors.commitmentHours && <p className="mt-1 text-sm text-red-500">{errors.commitmentHours}</p>}
                </div>

                {/* Why Join */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Why do you wish to join E-Cell IIT BHU and the above selected teams(s)? *</label>
                  <textarea
                    name="whyJoin"
                    rows="3"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.whyJoin ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your answer here..."
                  ></textarea>
                  {errors.whyJoin && <p className="mt-1 text-sm text-red-500">{errors.whyJoin}</p>}
                </div>

                {/* Previous Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous experiences in student organization/management (mention in points) *</label>
                  <textarea
                    name="previousExperience"
                    rows="3"
                    value={formData.previousExperience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors ${errors.previousExperience ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your answer here..."
                  ></textarea>
                  {errors.previousExperience && <p className="mt-1 text-sm text-red-500">{errors.previousExperience}</p>}
                </div>

                {/* Non Academic Engagements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Any non-academic engagements?</label>
                  <textarea
                    name="nonAcademicEngagements"
                    rows="2"
                    value={formData.nonAcademicEngagements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
                    placeholder="Your answer here..."
                  ></textarea>
                </div>

                {/* Other Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Any other point(s) you wish to mention</label>
                  <textarea
                    name="otherPoints"
                    rows="2"
                    value={formData.otherPoints}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors"
                    placeholder="Your answer here..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-orange-300"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
