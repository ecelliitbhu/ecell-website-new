import React from "react";
import Image from "next/legacy/image";
import Footer from "@/components/Footer";
import Nav from "../components/navbar/NavLayout";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Lightbulb, Zap, Rocket, Cpu, BarChart3, Sprout, ArrowRight, Star, Users, Target, TrendingUp, FileText, BookOpen } from 'lucide-react';

const incubators = [
  {
    id: 1,
    title: "Ideation Innovation & Incubation Foundation",
    shortTitle: "I3 Foundation",
    description: "Umbrella organization at IIT BHU for nurturing start-ups with comprehensive support and mentorship programs.",
    logo: <Lightbulb className="w-10 h-10 text-yellow-500" />,
    category: "Innovation Hub",
    website: "/i3",
    color: "from-yellow-100 to-orange-100",
    features: ["Startup Mentorship", "Funding Support", "Networking Events"]
  },
  {
    id: 2,
    title: "NCL-IIT BHU Incubation Centre",
    shortTitle: "NCL-IIT BHU",
    description: "A Northern Coalfields Limited (NCL) CSR initiative funded incubator focusing on sustainable and impactful innovations.",
    logo: <Zap className="w-10 h-10 text-blue-500" />,
    category: "CSR Initiative",
    website: "/ncl",
    color: "from-blue-100 to-indigo-100",
    features: ["CSR Funding", "Sustainable Tech", "Industry Partnership"]
  },
  {
    id: 3,
    title: "R-ABI, IIT BHU",
    shortTitle: "R-ABI",
    description: "An Agribusiness and Agri-preneurship focused incubator at IIT BHU promoting agricultural innovation and rural development.",
    logo: <Sprout className="w-10 h-10 text-green-500" />,
    category: "Agribusiness",
    website: "/rabi",
    color: "from-green-100 to-emerald-100",
    features: ["Agricultural Innovation", "Rural Development", "Agri-preneurship"]
  },
  {
    id: 4,
    title: "Cisco thingQbator",
    shortTitle: "ThingQbator",
    description: "An internal makerspace 'Internet of Things' - focused incubator fostering IoT innovation and connected device development.",
    logo: <Cpu className="w-10 h-10 text-purple-500" />,
    category: "IoT Focus",
    website: "/ciscotq",
    color: "from-purple-100 to-pink-100",
    features: ["IoT Development", "Connected Devices", "Hardware Support"]
  },
  {
    id: 5,
    title: "IDAPT-Hub Foundation",
    shortTitle: "IDAPT-Hub",
    description: "Technology Innovation Hub for 'Data Analytics and Predictive Technologies' driving data-driven innovation solutions.",
    logo: <BarChart3 className="w-10 h-10 text-red-500" />,
    category: "Data Analytics",
    website: "/idaptHub",
    color: "from-red-100 to-rose-100",
    features: ["Data Analytics", "Predictive Tech", "AI/ML Support"]
  },
  {
    id : 6,
    title : "Joint Incubation Centre - IIT BHU",
    shortTitle : "JIC-IIT BHU",
    description : "Collaboration between IIT (BHU) Varanasi and Union Bank of India to promote entrepreneurship and innovation, Supported by the I-3 Foundation ",
    logo : <Star className="w-10 h-10 text-amber-500" />,
    category : "Mentorship Infrastructure",
    website : "/JIC",
    color : "from-amber-100 to-yellow-100",
    features : ["Collaboration", "Entrepreneurship", "Innovation Support"]
  }
];

const policyInfo = {
  title: "Innovation & Start-up Policy IIT BHU",
  shortTitle: "Startup Policy",
  description: "Official Startup Policy of IIT BHU providing framework and guidelines for entrepreneurial activities within the institute.",
  logo: <Rocket className="w-10 h-10 text-indigo-500" />,
  category: "Policy Framework",
  website: "https://www.iitbhu.ac.in/contents/institute/cf/misc/doc/innovation_start_up_policy.pdf",
  color: "from-indigo-100 to-purple-100",
  features: ["Policy Framework", "Guidelines", "Institutional Support"]
};

const IncubatorsMain = ({
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

  const router = useRouter();
   const handleCardClick = (website) => {
    
    if (website.startsWith('/')) {
    
      router.push(website);
    } else {
      
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  // Dynamic grid layout function
  const renderIncubatorGrid = () => {
    const itemsPerRow = 3; // Desktop: 3 items per row
    const totalItems = incubators.length;
    const completeRows = Math.floor(totalItems / itemsPerRow);
    const remainingItems = totalItems % itemsPerRow;
    
    const rows = [];
    
    // Render complete rows
    for (let row = 0; row < completeRows; row++) {
      const startIndex = row * itemsPerRow;
      const endIndex = startIndex + itemsPerRow;
      const rowItems = incubators.slice(startIndex, endIndex);
      
      rows.push(
        <div key={`row-${row}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-8">
          {rowItems.map((incubator) => renderIncubatorCard(incubator))}
        </div>
      );
    }
    
    // Render incomplete row (centered)
    if (remainingItems > 0) {
      const startIndex = completeRows * itemsPerRow;
      const rowItems = incubators.slice(startIndex);
      
      // Dynamic grid classes based on remaining items
      let gridClass = '';
      let containerClass = '';
      
      if (remainingItems === 1) {
        gridClass = 'grid grid-cols-1 gap-8';
        containerClass = 'max-w-sm mx-auto';
      } else if (remainingItems === 2) {
        gridClass = 'grid grid-cols-1 md:grid-cols-2 gap-8';
        containerClass = 'max-w-3xl mx-auto';
      }
      
      rows.push(
        <div key={`row-incomplete`} className={`${containerClass} w-full`}>
          <div className={gridClass}>
            {rowItems.map((incubator) => renderIncubatorCard(incubator))}
          </div>
        </div>
      );
    }
    
    return rows;
  };

  // Render individual incubator card
  const renderIncubatorCard = (incubator) => (
  <Card 
    key={incubator.id}
    className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${incubator.color} border-0 overflow-hidden relative h-full flex flex-col w-full p-6 md:p-8`}
    onClick={() => handleCardClick(incubator.website)}
  >
    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 transition-all duration-500 z-10"></div>
    
    <CardHeader className="pb-4 relative z-20">
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="p-3 rounded-xl bg-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            {incubator.logo}
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-colors duration-300" />
      </div>
      
      <CardTitle className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-700 transition-colors duration-300 leading-tight">
        {incubator.title}
      </CardTitle>
      
      <div className="flex items-center justify-between mb-3">
        <Badge variant="secondary" className="bg-white/80 text-gray-700 font-medium px-3 py-1 text-xs">
          {incubator.category}
        </Badge>
      </div>
    </CardHeader>
    
    <CardContent className="pt-0 relative z-20 flex-1 flex flex-col">
      <CardDescription className="text-gray-800 font-medium text-base mb-4 leading-relaxed flex-1">
        {incubator.description}
      </CardDescription>
      
      <div className="space-y-3 mb-6">
        <div className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
          Key Features:
        </div>
        <div className="flex flex-wrap gap-2">
          {incubator.features.map((feature, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-sm font-semibold bg-white/70 border border-gray-300 text-gray-800 hover:bg-white transition-colors duration-200 px-3 py-1"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/60">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Click to explore</span>
          <div className="flex items-center space-x-1 text-orange-600 group-hover:translate-x-2 transition-transform duration-300">
            <span className="font-medium">Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);


  // Define the background pattern style
 

  return (
   <>
   <Nav/>
    <div className="min-h-screen bg-[#f8f8f8]">

      
      {/* Enhanced Hero Section */}
     <div className="relative overflow-hidden bg-gradient-to-r from-[#ffc78f] via-[#ffb066] to-[#ffc78f] text-gray-900">



        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="mb-6 inline-flex items-center px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            <Lightbulb className="w-4 h-4 mr-2 " />
            <span className="text-sm font-medium">Innovation Ecosystem</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Innovation <span className="text-yellow-200 relative">
              Incubators
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Discover our comprehensive ecosystem of incubators fostering innovation, entrepreneurship, and technological advancement at IIT BHU
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 text-base">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 " />
              <span>Nurturing Ideas Into Reality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Empowering Entrepreneurs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 md:mb-16">
          {[
        { value: "5+", label: "Active Incubators" },
    { value: "100+", label: "Startups Supported" },
    { value: "50+", label: "Expert Mentors" },
    { value: "₹10Cr+", label: "Funding Facilitated" },
  ].map((item, index) => (
    <div key={index} className="text-center group">
      <div className="bg-white rounded-2xl px-6 py-5 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
        
        <div className="text-4xl font-extrabold text-orange-500 mb-2 transition-transform duration-300 group-hover:scale-110">
          {item.value}
        </div>
        
        <p className="text-gray-700 text-sm font-medium">{item.label}</p>
        
        <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto mt-3"></div>
      </div>
    </div>
      ))}
    </div>


        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our <span className="text-orange-600">Incubator Network</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of specialized incubators, each designed to nurture innovation in specific domains
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Dynamic Incubator Grid */}
        <div className="flex flex-col items-center">
          {renderIncubatorGrid()}
        </div>

        {/* Policy Framework Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Policy <span className="text-orange-600">Framework</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive guidelines and frameworks supporting entrepreneurial activities at IIT BHU
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Policy Card */}
          <div className="max-w-4xl mx-auto">
            <Card 
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${policyInfo.color} border-0 overflow-hidden relative h-full flex flex-col`}
              onClick={() => handleCardClick(policyInfo.website)}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 transition-all duration-500 z-10"></div>
              
              <CardHeader className="pb-3 relative z-20">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="p-3 rounded-xl bg-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      {policyInfo.logo}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-colors duration-300" />
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-colors duration-300" />
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-700 transition-colors duration-300 leading-tight">
                  {policyInfo.title}
                </CardTitle>
                
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-white/80 text-gray-700 font-medium px-2 py-1 text-xs">
                    {policyInfo.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 relative z-20 flex-1 flex flex-col">
                <CardDescription className="text-gray-700 mb-4 leading-relaxed text-base flex-1">
                  {policyInfo.description}
                </CardDescription>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-orange-600" />
                    Key Areas:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {policyInfo.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-sm bg-white/60 border-gray-300 text-gray-700 hover:bg-white/80 transition-colors duration-200 px-3 py-1"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/60">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Click to view policy document</span>
                    <div className="flex items-center space-x-1 text-orange-600 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-medium">View PDF</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        
      </div>
    </div>
    </>
  );
};

export default IncubatorsMain;


