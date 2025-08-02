import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Nav from "../components/navbar/NavLayout";

const IncubatorPage = ({
  title,
  highlightedTitle,
  description,
  logoSrc,
  questionMarkSrc,
  mainImage,
  buttonText,
  buttonLink,
  programs = [],
  facilities = [],
  selectionProcess = [],
  preIncubationPrograms = [],
  incubationPrograms = [],
  selectionCriteria = [],
  description2,
  title2,
  title3,
  i3Image,
  i3Logo,
  idaptLogo,
  nclLogo,
  currentData = [],
  services = [],
  currentDatai3 = [],
}) => {
  return (
    <div className="body bg-[#fffefb] text-[#333] font-inter">
      <Nav />

      <div className="heading mt-[40px] text-center sm:mt-[60px]">
        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl bg-gradient-to-r from-[#DD6D23] to-[#FFAA00] bg-clip-text text-transparent">
          {title} <span className="text-[#DD6D23]">{highlightedTitle}</span>
        </h1>
      </div>

      <div className="para mt-5 ml-2 bg-gradient-to-r from-[#ffe4c4] to-[#fff0e0] border border-[#f5c796] rounded-full p-4 max-w-[400px] sm:max-w-[800px] sm:p-8 mx-auto mb-5 sm:mt-10 shadow-md">
        <p className="text-lg text-center sm:text-xl">{description}</p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center">
        <div className="flex justify-center sm:justify-start w-full sm:w-1/2">
          <div className="shadow-md hover:shadow-xl transition duration-300 rounded-xl p-4 mt-6 w-full sm:p-8 sm:mt-8 sm:ml-6 sm:w-[95%] bg-white">
            {i3Logo && (
              <div className="flex justify-center mb-3 mr-16">
                <Image src={i3Logo} height={100} width={100} alt="i3 logo" unoptimized/>
              </div>
            )}
            {idaptLogo && (
              <div className="flex justify-center mb-3 mr-16">
                <Image src={idaptLogo} height={100} width={250} alt="idapt logo" unoptimized/>
              </div>
            )}
            {nclLogo && (
              <div className="flex justify-center mb-2 mr-16">
                <Image src={nclLogo} height={100} width={250} alt="ncl logo" unoptimized/>
              </div>
            )}

            <div className="flex items-center mb-3">
              {logoSrc ? (
                <>
                  <div className="text-2xl font-semibold mr-2 sm:text-[2.5rem]">What is</div>
                  <Image src={logoSrc} height={48} width={243} unoptimized alt={`${title} logo`} />
                </>
              ) : (
                <div className="text-2xl font-semibold sm:text-[2.5rem] mr-2">
                  {title2} <span className="text-[#DD6D23]">{highlightedTitle}</span>
                  {title3 && <span className="ml-2 text-[#4F4F52]">{title3}</span>}
                </div>
              )}
              {questionMarkSrc && <Image src={questionMarkSrc} height={30} width={20} alt="?" unoptimized/>}
            </div>

            <p className="text-base sm:text-[1.2rem] text-[#676767]">{description2}</p>

            <button
              className="px-4 py-2 mt-6 text-base font-bold rounded-full bg-[#DD6D23] text-white sm:text-lg hover:bg-[#c45d1b] hover:scale-105 transition transform duration-300 shadow-md"
              onClick={() => (window.location.href = buttonLink)}
            >
              {buttonText}
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full sm:w-1/2">
          <div className="w-[90%] sm:w-full">
            <Image src={mainImage} alt="main" layout="responsive" width={640} height={426} unoptimized />
          </div>
        </div>
      </div>

      {i3Image && (
        <div className="flex justify-center items-center mt-10 md:mt-12 lg:mt-16">
          <div className="w-full max-w-[700px] h-auto">
            <Image src={i3Image} alt="I3 Foundation" layout="responsive" width={700} height={700} unoptimized/>
          </div>
        </div>
      )}

      {/* Section Header Reusable */}
      {selectionCriteria.length > 0 && (
        <>
          <SectionTitle title="Selection Criteria" />
          <CardGrid data={selectionCriteria} />
        </>
      )}

      {programs.length > 0 && (
        <>
          <SectionTitle title="Programs" />
          <CardGrid data={programs} colored />
        </>
      )}

      {facilities.length > 0 && (
        <>
          <SectionTitle title="Provided Facilities" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="p-4 rounded-xl shadow-md bg-orange-100 flex flex-col items-center justify-center w-full h-[300px] hover:shadow-xl transition duration-300"
              >
                <h3 className="text-2xl font-bold text-center mt-3 text-[#DD6D23]">{facility.title}</h3>
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-28 h-28 object-cover rounded-md mb-4 mt-8"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {currentData.length > 0 && (
        <>
          <SectionTitle title="Achievements" />
          <AchievementGrid data={currentData} />
        </>
      )}

      {currentDatai3.length > 0 && (
        <>
          <SectionTitle title="Achievements" />
          <AchievementGrid data={currentDatai3} isCompact />
        </>
      )}

      <Footer />
    </div>
  );
};

export default IncubatorPage;

// Section Header
const SectionTitle = ({ title }) => (
  <div className="bg-gradient-to-r from-[#ffe0c0] to-[#fff2e1] h-[60px] shadow-md flex items-center mt-10 justify-center sm:h-[90px] mb-6 sm:mb-8">
    <p className="text-2xl text-[#4F4F52] font-black sm:text-[3rem]">{title}</p>
  </div>
);

// Reusable Grid for Programs / Selection
const CardGrid = ({ data, colored = false }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 px-4">
    {data.map((item, index) => (
      <div
        key={index}
        className={`p-4 rounded-xl shadow-md ${
          colored ? "bg-orange-100" : "bg-white"
        } hover:shadow-xl transition duration-300`}
      >
        <h3 className="text-lg font-bold sm:text-xl mb-2 text-[#DD6D23]">{item.title}</h3>
        <p className="text-sm text-[#676767] sm:text-base">{item.description}</p>
      </div>
    ))}
  </div>
);

// Achievements Grid
const AchievementGrid = ({ data, isCompact = false }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-10 px-4">
    {data.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center bg-orange-100 rounded-xl shadow-md p-4 mb-10 hover:shadow-xl transition duration-300"
      >
        {!isCompact && (
          <div className="text-yellow-500 text-6xl mb-3">
            {["💡", "📄", "🔥", "🚀"][index % 4]}
          </div>
        )}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl font-bold text-black hover:underline text-center"
        >
          {item.title}
        </a>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#676767] mt-2 text-center hover:underline"
        >
          {item.description}
        </a>
      </div>
    ))}
  </div>
);

