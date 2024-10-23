
import React from "react";
import Image from "next/legacy/image";
import { Row, Container, Col } from "react-bootstrap";

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
  preIncubationPrograms=[],
  incubationPrograms=[],
  selectionCriteria=[],
  description2,
  title2,
  title3
}) => {
  return (
    <Container fluid className="body">
    
      <div className="heading mt-[60px] text-center">
        <h1 className="text-6xl font-bold text-[#333]">
          {title} <span className="text-[#DD6D23]">{highlightedTitle}</span>
        </h1>
      </div>

      
      <div className="para mt-10 ml-[5px] bg-[#fde2ca] rounded-full p-8 max-w-[800px] sm:p-10 mx-auto mb-5">
        <p className="text-xl text-[#333] text-center">{description}</p>
      </div>

     
      <Row className="align-items-center">
        <Col lg={6} md={12} sm={12}>
          <div className="shadow-md rounded-lg p-8 mt-8 ml-6 w-[95%]">
            <div className="lg:flex lg:items-center md:flex md:items-center mb-3 p-2">
              {logoSrc ? (
                <>
                  <div className="text-[2.5rem] font-semibold mr-2">What is</div>
                  <Image src={logoSrc} height={48} width={243} alt={`${title} logo`} />
                </>
              ) : (
                <div className="text-[2.5rem] font-semibold mr-2">
                  {title2} <span className="text-[#DD6D23]">{highlightedTitle}</span>
                  {title3 && (
    <span className="ml-2 text-[#4F4F52]">{title3}</span> 
  )}
                </div>
              )}
              <Image src={questionMarkSrc} height={42.5} width={29.23} alt="Question mark" />
            </div>
            <p className="text-[1.2rem] text-[#676767]">{description2}</p>
            <button
              className="px-3 py-2 text-[16px] font-bold rounded-full bg-[#DD6D23] text-white mr-5 mt-6 text-lg"
              onClick={() => window.location.href = buttonLink}
            >
              {buttonText}
            </button>
          </div>
        </Col>

        <Col lg={6} md={12} sm={12}>
          <div className="image-container">
            <Image src={mainImage} alt={`${title} image`} layout="responsive" width={640} height={426} />
          </div>
        </Col>
      </Row>
      
      {selectionCriteria.length > 0 && (
        <>
          <div className="bg-[#D9D9D9C4] h-[90px] mb-8 shadow-md flex items-center mt-12 justify-center relative">
            <p className="text-[#4F4F52] text-[3rem] font-black ml-[90px] m-0">Selection Criteria</p>
          </div>

          <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {selectionCriteria.map((sc, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{sc.title}</h3>
                <p className="text-[#676767]">{sc.description}</p>
              </div>
            ))}
          </Row>
        </>
      )}
     
      {programs.length > 0 && (
        <>
          <div className="bg-[#D9D9D9C4] h-[90px] mb-8 shadow-md flex items-center mt-12 justify-center relative">
            <p className="text-[#4F4F52] text-[3rem] font-black ml-[90px] m-0">Programs</p>
          </div>

          <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {programs.map((program, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-[#676767]">{program.description}</p>
              </div>
            ))}
          </Row>
        </>
      )}
      {selectionProcess.length > 0 && (
        <>
          <div className="mt-20 mb-2 text-center">
            <p className="text-[#4F4F52] text-[2.5rem] font-black">Selection Process</p>
          </div>

          <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {selectionProcess.map((process, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-[#676767]">{process.description}</p>
              </div>
            ))}
          </Row>
        </>
      )}

        
        {preIncubationPrograms.length > 0 && (
        <>
          <div className="bg-[#D9D9D9C4] h-[90px] mb-8 shadow-md flex items-center mt-12 justify-center relative">
            <p className="text-[#4F4F52] text-[3rem] font-black ml-[90px] m-0">Pre-Incubation Stage</p>
          </div>

          <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {preIncubationPrograms.map((program, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-[#676767]">{program.description}</p>
              </div>
            ))}
          </Row>
        </>
      )}
      {incubationPrograms.length > 0 && (
        <>
          <div className="bg-[#D9D9D9C4] h-[90px] mb-8 shadow-md flex items-center mt-12 justify-center relative">
            <p className="text-[#4F4F52] text-[3rem] font-black ml-[90px] m-0">Incubation Programs</p>
          </div>

          <Row className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {incubationPrograms.map((program, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-[#676767]">{program.description}</p>
              </div>
            ))}
          </Row>
        </>
      )}
 
 
  
    

{facilities.length > 0 && (
        <>
          <div className="mt-20 mb-2 text-center">
            <p className="text-[#4F4F52] text-[2.5rem] font-black">Provided Facilities</p>
          </div>

          <div className="bg-white h-[85px] lg:mb-9 mb-28 pt-4 rounded-lg shadow-md">
            <ul className="list-disc p-2 m-0 flex flex-col sm:flex-row justify-around bg-white text-[#505058] text-[1.5rem] font-bold">
              {facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>
        </>
      )} 
    </Container>
  );
};

export default IncubatorPage;

