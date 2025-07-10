import Link from 'next/link';
import React from 'react';


const Ribbon = () => {
  
  const frames = [
   
    { imageSrc: "https://ik.imagekit.io/ecelliitbhu/website/esummit.png" },
    { imageSrc: "https://ik.imagekit.io/ecelliitbhu/website/esummit.png" },
    { imageSrc: "https://ik.imagekit.io/ecelliitbhu/website/esummit.png" },
    { imageSrc: "https://ik.imagekit.io/ecelliitbhu/website/esummit.png" },
    { imageSrc: "https://ik.imagekit.io/ecelliitbhu/website/esummit.png" },
    { imageSrc: "https://ik.imagekit.io/ecelliitbhu/website/esummit.png" },
  ];


  const repeatedFrames = [...frames, ...frames];

  return (
    <Link href="https://esummit.ecelliitbhu.com/" className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
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
           
           justify-content: center;  
              align-items: center;  
           
            border: none; 
            box-shadow: none;
            height: 100%; 
         
          }
          .text-container {
            display: flex; 
            align-items: center; 
            flex-wrap:wrap;
            height: 100%; 
            
          }
             .text-shadow {
            text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5); 
            font-weight: bold; 
           
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
                className="h-20 sm:h-21 md:h-24 lg:h-25 xl:h-26 mt-2 mr-2" 
              />
              <div className="text-gray-700 justify-center  items-center flex flex-wrap text-shadow" />
              
             
              <div className="ml-3 mr-1">31<sup>st</sup></div>
            
              <div className="mr-1 font-bold">JAN</div>
              <div className="mr-2 font-bold">2025</div>
              <div className="mr-2">TO</div>
              <div className="mr-1">2<sup>nd</sup></div>
              <div className="mr-1">FEB</div>
              <div className="mr-2">2025</div>

              
            </div>
          </div>
        ))}
      </div>
    </div>
    </Link>
  );
};

export default Ribbon;

