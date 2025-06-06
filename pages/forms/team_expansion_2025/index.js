"use client";

import { useState } from "react";
import Head from "next/head";
import Nav from "../../../components/navbar/NavLayout";
import { firestoreDB } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const apply = () => {
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
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div className="bg-white shadow-lg">
          <Nav />

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Application Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                E-Cell'25 Team Expansion
              </h3>
              <p className="text-gray-700 mb-6">
                The Entrepreneurship Cell (E-Cell), IIT (BHU) Varanasi aims to
                foster the spirit of entrepreneurship and innovation in the
                college. Fill this form to be a part of E-Cell Team and
                contribute to build the entrepreneurship culture!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone and Year */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your WhatsApp number"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Your Year *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.year ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                    )}
                  </div>
                </div>

                {/* Course and Branch */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Your Course *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.course ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.course}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Your Branch *
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.branch ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your branch</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                    {errors.branch && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.branch}
                      </p>
                    )}
                  </div>
                </div>

                {/* Team Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Interested Teams According to Preference *
                    <span className="text-sm text-gray-500 ml-2">
                      (Maximum 3 teams, minimum 1 team)
                    </span>
                  </label>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Instructions:</strong> Select teams in order of
                      your preference. The first team you select will be your
                      "First preference", second will be "Second preference",
                      and so on. You can select maximum 3 teams.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {teams.map((team) => {
                      const preference = getTeamPreference(team.id);
                      const isSelected = preference !== null;

                      return (
                        <div
                          key={team.id}
                          className={`border rounded-lg p-4 ${
                            isSelected
                              ? "border-blue-300 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id={team.id}
                              checked={isSelected}
                              onChange={(e) =>
                                handleTeamSelection(team.id, e.target.checked)
                              }
                              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <label
                                  htmlFor={team.id}
                                  className="font-semibold text-gray-900 cursor-pointer"
                                >
                                  {team.name}
                                </label>
                                {isSelected && (
                                  <span
                                    className={`text-sm px-2 py-1 rounded ${getPreferenceColor(
                                      preference
                                    )}`}
                                  >
                                    {getPreferenceText(preference)}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {team.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.selectedTeams && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.selectedTeams}
                    </p>
                  )}

                  {/* Selected Teams Summary */}
                  {formData.selectedTeams.length > 0 && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Your Selected Teams:
                      </h4>
                      <div className="space-y-1">
                        {formData.selectedTeams
                          .sort((a, b) => a.preference - b.preference)
                          .map((selectedTeam) => {
                            const team = teams.find(
                              (t) => t.id === selectedTeam.teamId
                            );
                            return (
                              <div
                                key={selectedTeam.teamId}
                                className="flex items-center space-x-2"
                              >
                                <span
                                  className={getPreferenceColor(
                                    selectedTeam.preference
                                  )}
                                >
                                  {getPreferenceText(selectedTeam.preference)}:
                                </span>
                                <span className="text-green-700">
                                  {team?.name}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Commitment Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commitment (hours per week) *
                  </label>
                  <input
                    type="number"
                    name="commitmentHours"
                    value={formData.commitmentHours}
                    onChange={handleInputChange}
                    min="1"
                    max="40"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.commitmentHours
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter number of hours per week"
                  />
                  {errors.commitmentHours && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.commitmentHours}
                    </p>
                  )}
                </div>

                {/* Why Join */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you wish to join E-Cell IIT BHU and the above
                    selected team(s)? *
                  </label>
                  <textarea
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.whyJoin ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Explain your motivation for joining E-Cell and the selected teams..."
                  />
                  {errors.whyJoin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.whyJoin}
                    </p>
                  )}
                </div>

                {/* Previous Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous experiences in student organization/management
                    (please mention in points) *
                  </label>
                  <textarea
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.previousExperience
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="• Point 1&#10;• Point 2&#10;• Point 3"
                  />
                  {errors.previousExperience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.previousExperience}
                    </p>
                  )}
                </div>

                {/* Non-Academic Engagements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any non-academic engagements?
                  </label>
                  <textarea
                    name="nonAcademicEngagements"
                    value={formData.nonAcademicEngagements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe any non-academic activities, hobbies, or engagements..."
                  />
                </div>

                {/* Other Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any other point(s) you wish to mention
                  </label>
                  <textarea
                    name="otherPoints"
                    value={formData.otherPoints}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    }`}
                  >
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application"}
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

export default apply;
