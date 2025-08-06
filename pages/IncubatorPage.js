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
    <div className="body bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 font-inter min-h-screen">
      <Nav />

      <div className="heading mt-[40px] text-center sm:mt-[60px]">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
          {title} <span className="text-gray-900 font-extrabold">{highlightedTitle}</span>
        </h1>
      </div>

      <div className="para mt-6 ml-2 bg-white border border-orange-200 rounded-2xl p-6 max-w-[400px] sm:max-w-[800px] sm:p-8 mx-auto mb-8 sm:mt-12 shadow-lg backdrop-blur-sm">
        <p className="text-lg text-center sm:text-xl text-gray-700 leading-relaxed">{description}</p>
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
            <Image src={mainImage} alt="main" layout="responsive" width={640} height={426} unoptimized className="hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {i3Image && (
        <div className="flex justify-center items-center mt-10 md:mt-12 lg:mt-16">
          <div className="w-full max-w-[700px] h-auto">
            <Image src={i3Image} alt="I3 Foundation" layout="responsive" width={700} height={700} unoptimized className="hover:scale-105 transition-transform duration-500"/>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 flex flex-col items-center justify-center w-full h-[320px] hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-32 h-32 bg-white rounded-xl mb-6 shadow-md flex items-center justify-center">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 "/>
                </div>
             

                <h3 className="text-xl font-bold text-center text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{facility.title}</h3>
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
  <div className="text-center mt-16 mb-12">
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    <div className="mt-3 h-1 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
  </div>
);


// Reusable Grid for Programs / Selection
const CardGrid = ({ data, colored = false }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 px-6 mb-12">
    {data.map((item, index) => (
      <div
        key={index}
        className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
          colored 
            ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300" 
            : "bg-white border-gray-200 hover:border-orange-200"
        }`}
      >
        <h3 className="text-lg font-bold sm:text-xl mb-3 text-gray-900 hover:text-orange-600 transition-colors duration-300">{item.title}</h3>
        <p className="text-sm text-gray-600 sm:text-base leading-relaxed">{item.description}</p>
      </div>
    ))}
  </div>
);

// Achievements Grid
const AchievementGrid = ({ data, isCompact = false }) => (
  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-10 px-6 mb-16">
    {data.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        {!isCompact && (
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {["💡", "📄", "🔥", "🚀"][index % 4]}
          </div>
        )}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-bold text-gray-900 hover:text-orange-600 text-center transition-colors duration-300 group-hover:scale-105"
        >
          {item.title}
        </a>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-gray-600 mt-3 text-center hover:text-orange-500 transition-colors duration-300"
        >
          {item.description}
        </a>
      </div>
    ))}
  </div>
);