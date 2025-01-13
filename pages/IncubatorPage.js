import React from "react";
import Image from "next/legacy/image";
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
  currentData=[],
  services=[],
  currentDatai3=[],
}) => {
  return (
    <div className="body">
      <Nav />

      <div className="heading mt-[40px] text-center sm:mt-[60px]">
        <h1 className="text-3xl font-bold text-[#333] sm:text-4xl lg:text-6xl">
          {title} <span className="text-[#DD6D23]">{highlightedTitle}</span>
        </h1>
      </div>

      <div className="para mt-5 ml-2 bg-[#fde2ca] rounded-full p-4 max-w-[400px] sm:max-w-[800px] sm:p-8 mx-auto mb-5 sm:mt-10">
        <p className="text-lg text-[#333] text-center sm:text-xl">{description}</p>
      </div>
     
      <div className="flex flex-col-reverse sm:flex-row items-center">
      
        <div className="flex justify-center sm:justify-start w-full sm:w-1/2">
      
          <div className="shadow-md rounded-lg p-4 mt-6 w-full sm:p-8 sm:mt-8 sm:ml-6 sm:w-[95%]">
          {i3Logo ? (
            <>
            <div className="flex  justify-center mb-3 mr-16">
            <Image src={i3Logo} height={100} width={100} alt={`${title} logo`} />
            </div>
           
            </>
           )
           : (
              <div></div>
          ) }
          {idaptLogo ? (
            <>
            <div className="flex  justify-center mb-3 mr-16">
            <Image src={idaptLogo} height={100} width={250} alt={`${title} logo`} />
            </div>
           
            </>
           )
           : (
              <div></div>
          ) } 
          {nclLogo ? (
            <>
            <div className="flex  justify-center mb-2 mr-16">
            <Image src={nclLogo} height={100} width={250} alt={`${title} logo`} />
            </div>
           
            </>
           )
           : (
              <div></div>
          ) }
            <div className="flex items-center mb-3">
          
              {logoSrc ? (
                <>
                  <div className="text-2xl font-semibold mr-2 sm:text-[2.5rem]">What is</div>
                  <Image src={logoSrc} height={48} width={243} alt={`${title} logo`} />
                </>
              ) : (
                <div className="text-2xl font-semibold sm:text-[2.5rem] mr-2">
                  {title2} <span className="text-[#DD6D23]">{highlightedTitle}</span>
                  {title3 && <span className="ml-2 text-[#4F4F52]">{title3}</span>}
                </div>
              )}
              {questionMarkSrc && <Image src={questionMarkSrc} height={30} width={20} alt="" />}
            </div>
            <p className="text-base sm:text-[1.2rem] text-[#676767]">{description2}</p>
            <button
              className="px-2 py-1 mt-4 text-base font-bold rounded-full bg-[#DD6D23] text-white sm:px-3 sm:py-2 sm:mt-6 sm:text-lg"
              onClick={() => (window.location.href = buttonLink)}
            >
              {buttonText}
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full sm:w-1/2">
          <div className="w-[90%] sm:w-full">
            <Image src={mainImage} alt={`${title} image`} layout="responsive" width={640} height={426} />
          </div>
        </div>
      </div>

      {i3Image && (
        <div className="flex justify-center items-center mt-10 md:mt-12 lg:mt-16">
          <div className="image-container w-full max-w-[700px] h-auto">
            <Image src={i3Image} alt="I3 Foundation" layout="responsive" width={700} height={700} />
          </div>
        </div>
      )}

      {selectionCriteria.length > 0 && (
        <>
          <div className="bg-[#D9D9D9C4] h-[60px] shadow-md flex items-center mt-8 justify-center sm:h-[90px] mb-6 sm:mb-8">
            <p className="text-2xl text-[#4F4F52] font-black sm:text-[3rem] ml-3 sm:ml-[90px] m-0">Selection Criteria</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {selectionCriteria.map((sc, index) => (
              <div key={index} className="p-3 bg-white rounded-lg shadow-lg sm:p-4">
                <h3 className="text-lg font-bold sm:text-xl mb-2">{sc.title}</h3>
                <p className="text-sm text-[#676767] sm:text-base">{sc.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {programs.length > 0 && (
        <>
          <div className="bg-[#D9D9D9C4] h-[60px] shadow-md flex items-center mt-8 justify-center sm:h-[90px] mb-6 sm:mb-8">
            <p className="text-2xl text-[#4F4F52] font-black sm:text-[3rem] ml-3 sm:ml-[90px] m-0">Programs</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 ">
            {programs.map((program, index) => (
              <div key={index} className="p-3  rounded-lg shadow-lg sm:p-4 bg-orange-100">
                <h3 className="text-lg font-bold sm:text-xl mb-2">{program.title}</h3>
                <p className="text-sm text-[#676767] sm:text-base">{program.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {facilities.length > 0 && (
  <>
    <div className="bg-[#D9D9D9C4] h-[60px] shadow-md flex items-center mt-8 justify-center sm:h-[90px] mb-6 sm:mb-8">
      <p className="text-2xl text-[#4F4F52] font-black sm:text-[3rem] ml-3 sm:ml-[90px] m-0">
        Provided Facilities
      </p>
    </div>

    <div className="grid grid-cols-4 gap-2 sm:gap-6 lg:gap-1">
      {facilities.map((program, index) => (
        <div 
          key={index} 
          className="p-3 rounded-lg shadow-lg bg-orange-100 flex flex-col items-center justify-center"
          style={{ width: '300px', height: '300px' }} 
        >
          {/* Title */}
          <h3 className="text-2xl font-bold text-center mt-3">{program.title}</h3>
          
          {/* Image */}
          <img 
            src={program.image} 
            alt={program.title} 
            className="w-26 h-26 object-cover rounded-md mb-4 mt-8"
          />
        </div>
      ))}
    </div>
  </>
)}


      {currentData.length > 0 && (
  <>
    <div className="bg-[#D9D9D9C4] h-[60px] shadow-md flex items-center mt-8 justify-center sm:h-[90px] mb-6 sm:mb-8">
      <p className="text-2xl text-[#4F4F52] font-black sm:text-[3rem] ml-3 sm:ml-[90px] m-0">
        Achievements
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-10 ">
      {currentData.map((data, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-orange-100 rounded-lg shadow-lg p-4 mb-10"
        >
          <div className="text-yellow-500 text-6xl mb-3">
            {index === 0 && <span >💡</span>}
            {index === 1 && <span>📄</span>}
            {index === 2 && <span>🔥</span>}
            {index === 3 && <span>🚀</span>}
          </div>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl font-bold text-black "
            style={{ textDecoration: 'none' }}
          >
            {data.title}
          </a>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-[#676767] mt-2 text-center"
            style={{ textDecoration: 'none' }}
          >
            {data.description}
          </a>
        </div>
      ))}
    </div>
  </>
)}

{currentDatai3.length > 0 && (
  <>
    <div className="bg-[#D9D9D9C4] h-[60px] shadow-md flex items-center mt-8 justify-center sm:h-[90px] mb-6 sm:mb-8">
      <p className="text-2xl text-[#4F4F52] font-black sm:text-[3rem] ml-3 sm:ml-[90px] m-0">
        Achievements
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-10">
      {currentDatai3.map((data, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center  rounded-lg shadow-lg p-4 bg-orange-100 mb-10"
        >
          <a 
            href={data.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-5xl font-bold text-black hover:underline"
            style={{ textDecoration: 'none' }}
          >
            {data.title}
          </a>
          <a 
            href={data.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-2xl text-[#676767] mt-2 text-center hover:underline"
            style={{ textDecoration: 'none' }}
          >
            {data.description}
          </a>
        </div>
      ))}
    </div>
  </>
)}

      <Footer />
    </div>
  );
};

export default IncubatorPage;
