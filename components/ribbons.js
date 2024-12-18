import Link from 'next/link';
import React from 'react';


const Ribbon = () => {
  
  const frames = [
   
    { imageSrc: "/startupjunction.png" },
    { imageSrc: "/startupjunction.png" },
    { imageSrc: "/startupjunction.png" },
    { imageSrc: "/startupjunction.png" },
    { imageSrc: "/startupjunction.png" },
    { imageSrc: "/startupjunction.png" },
  ];


  const repeatedFrames = [...frames, ...frames];

  return (
    <Link href="/startup_junction/" className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                className="h-12 mt-2 sm:h-10  md:h-10 lg:h-12  xl:h-14  mr-2" 
              />
              <div className="text-gray-700 justify-center  items-center flex flex-wrap text-shadow" />
              
              <div className="ml-4 mr-1">20<sup>th</sup></div>
            
              <div className="mr-1">DEC</div>
              <div className="mr-1">2024</div>
              <div className="mr-1">@</div>
              <div className="mr-1">Pune</div>
              <div className="mr-1">and</div>
              <div className="mr-1">Bangalore</div>

              
            </div>
          </div>
        ))}
      </div>
    </div>
    </Link>
  );
};

export default Ribbon;

