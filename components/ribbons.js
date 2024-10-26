
import React from 'react';

const Ribbon = () => {
  
  const frames = [
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      text: "20<sup>th</sup> TO 22<sup>nd</sup> SEPT 2024"
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      text: "20<sup>th</sup> TO 22<sup>nd</sup> SEPT 2024"
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      text: "20<sup>th</sup> TO 22<sup>nd</sup> SEPT 2024"
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      text: "20<sup>th</sup> TO 22<sup>nd</sup> SEPT 2024"
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      text: "20<sup>th</sup> TO 22<sup>nd</sup> SEPT 2024"
    },
    {
      imageSrc: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/ST1722320782225STENDf3691766-15cd-4630-a786-0edfbeba48cd.jpg",
      text: "20<sup>th</sup> TO 22<sup>nd</sup> SEPT 2024"
    }
  ];


  const repeatedFrames = [...frames, ...frames];

  return (
    <div className="overflow-hidden bg-white shadow-md relative">
      <style>
        {`
          @keyframes moveRibbon {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); } 
          }
          .animate-ribbon {
            display: flex;
            animation: moveRibbon 30s linear infinite; 
            width: calc(100%);
          }
          .frame {
            flex: none;
            width: calc(200% / ${frames.length});  
            white-space: nowrap; 
           
           
           
            border: none; 
            box-shadow: none;
         
          }
          .text-container {
            display: flex; /* Flexbox for horizontal alignment */
            align-items: center; /* Center vertically */
          }
             .text-shadow {
            text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5); /* Add your desired shadow here */
            font-weight: bold; /* Make text bold */
            font-size: 1.5rem;
          }
        `}
      </style>
      <div className="flex animate-ribbon">
        {repeatedFrames.map((frame, index) => (
          <div key={index} className="frame bg-white shadow-md flex items-center justify-center py-2">
            <div className="text-container mx-2 text-sm sm:text-base font-bold">
              <img 
                src={frame.imageSrc} 
                alt="Event" 
                className="h-15 sm:h-16 mr-2" 
              />
              <span className="text-gray-700  text-shadow" dangerouslySetInnerHTML={{ __html: frame.text }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ribbon;
