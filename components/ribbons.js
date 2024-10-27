
import React from 'react';

const Ribbon = () => {
  
  const frames = [
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
    
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
    
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
     
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
    
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
     
    }
  ];


  const repeatedFrames = [...frames, ...frames];

  return (
    <div className="overflow-hidden bg-white shadow-md relative mb-16">
      <style>
        {`
          @keyframes moveRibbon {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); } 
          }
          .animate-ribbon {
            display: flex;
            animation: moveRibbon 30s linear infinite; 
            width: 100vw
          }
          .frame {
            flex: none;
            width: calc(200vw / ${frames.length});  
            white-space: nowrap; 
           
           
           
            border: none; 
            box-shadow: none;
         
          }
          .text-container {
            display: flex; /* Flexbox for horizontal alignment */
            align-items: center; /* Center vertically */
            flex-wrap:wrap;
          }
             .text-shadow {
            text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5); /* Add your desired shadow here */
            font-weight: bold; /* Make text bold */
            // font-size: 1.5rem;
          }
        `}
      </style>
      <div className="flex animate-ribbon">
        {repeatedFrames.map((frame, index) => (
          <div key={index} className="frame bg-white shadow-md flex items-center justify-center py-2">
            <div className="text-container flex flex-wrap justify-center items-center mx-2 text-sm sm:text-base font-bold">
              <img 
                src={frame.imageSrc} 
                alt="Event" 
                className="h-12 sm:h-10 md:h-11 lg:h-12 xl:h-14 mr-2" 
              />
              <div className="text-gray-700 justify-center  items-center flex flex-wrap text-shadow" />
              
              <div className="ml-2 mr-2">20<sup>th</sup></div>
              <div className="mr-2">TO</div>
              <div className="mr-2">22<sup>nd</sup></div>
              <div className="mr-2">SEPT</div>
              <div className="mr-2">2024</div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ribbon;

