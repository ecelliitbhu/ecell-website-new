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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {programs.map((program, index) => (
              <div key={index} className="p-3 bg-white rounded-lg shadow-lg sm:p-4">
                <h3 className="text-lg font-bold sm:text-xl mb-2">{program.title}</h3>
                <p className="text-sm text-[#676767] sm:text-base">{program.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {facilities.length > 0 && (
        <>
          <div className="mt-12 mb-6 text-center">
            <p className="text-2xl text-[#4F4F52] font-black sm:text-[2.5rem]">Provided Facilities</p>
          </div>

          <div className="bg-white h-auto mb-20 pt-4 rounded-lg shadow-md sm:h-[85px] sm:mb-9">
            <ul className="list-disc p-3 flex flex-col items-center gap-2 text-md sm:flex-row sm:justify-around text-[#505058] sm:text-[1.2rem] font-bold lg:text-2xl md:text-md">
              {facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default IncubatorPage;
