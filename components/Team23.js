import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { GrMail } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { StorageDB } from "@/lib/firebase";

const presidents = [
  {
    name: "PARTH GUPTA",
    image: "parth.jpeg",
    post: "VICE PRESIDENT E-CELL",
    email: "mailto:parthsanjeev.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/parthgupta03/",
  },
  {
    name: "VANSHIKA GUPTA",
    image: "Vanshika.jpg",
    post: "ASSOCIATE VICE PRESIDENT E-CELL",
    email: "mailto:vanshika.gupta.met20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/vanshikagupta13",
  },
];

const verticalHeads = [
  {
    name: "Atharv Patil",
    image: "Atharv.jpg",
    position: "STARTUP ASSISTANCE PROGRAM HEAD",
    email: "mailto:atharv.patil.che21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/atharv-patil/",
  },
  {
    name: "Mridul Ramakrishnan",
    image: "Mridul.jpg",
    position: "STARTUP ASSISTANCE PROGRAM HEAD",
    email: "mailto:mridul.ramakrishnan.mat21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/mridul-ramakrishnan-267401229/",
  },
  {
    name: "Shailesh Agarwal",
    image: "shailesh.jpg",
    position: "INNOVATION & INCUBATION HEAD",
    email: "mailto:shailesh.agarwal.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/mridul-ramakrishnan-267401229/",
  },
  {
    name: "ABHIRVEY IYER",
    image: "Abhirvey.jpeg",
    position: "STRATEGIC RELATIONS HEAD",
    email: "mailto:abhirvey.rajeshiyer.phe21@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/abhirveyiyer27/",
  },
  {
    name: "Varun Barve",
    image: "Varun.jpg",
    position: "PUBLIC RELATION HEAD",
    email: "mailto:barvevarun.makarand.cd.mst21@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/varunbarvem",
  },
  {
    name: "Rishav Thakur",
    image: "rishav.jpeg",
    position: "MARKETING HEAD",
    email: "mailto:rishav.thakur.cer21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/rishav-thakur-23b290199",
  },
  {
    name: "Pranjali Yadav",
    image: "Pranjali.jpg",
    position: "EVENTS HEAD",
    email: "mailto:pranjali.yadav.cd.mec21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/pranjali-yadav-39583022b",
  },
  {
    name: "Akshat Shah",
    image: "akshat.jpg",
    position: "EVENTS HEAD",
    email: "mailto:sakshat.kalpeshbhai.mst21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/akshat-shah-639b46223",
  },
  {
    name: "Sahil Gupta",
    image: "sahil.jpeg",
    position: "PUBLICITY HEAD",
    email: "mailto:sahil.sgupta.cer21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sahil-gupta-87268a23a",
  },
  {
    name: "Om Subham Pati",
    image: "om.png",
    position: "BRANDING HEAD",
    email: "mailto:omsubham.pati.cse21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/om-subham-pati-a49785242/",
  },
  {
    name: "Muskan Aggarwal",
    image: "Muskan_Aggarwal.png",
    position: "DESIGN HEAD",
    email: "mailto:muskan.aggarwal.min21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/muskan-aggarwal-3bba63238",
  },
  {
    name: "Indrajeet Gupta",
    image: "Indrajeet.jpg",
    position: "CONTENT HEAD",
    email: "mailto:indrajeet.gupta.min21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/indrajeet-gupta-0a5b25209",
  },
  {
    name: "Balveer Singh Rao",
    image: "balveer.jpeg",
    position: "TECH HEAD",
    email: "mailto:balveer.singhrao.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/balveer-singh-rao-636449229/",
  },
  {
    name: "Rahul Kumar Sonkar",
    image: "rahul.jpeg",
    position: "TECH HEAD",
    email: "mailto:rahul.kumarsonkar.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-sonkar-262442253/",
  },
  {
    name: "Sameer Sharma",
    image: "sameer.jpg",
    position: "HOSPITALITY HEAD",
    email: "mailto:sameer.sharma.che21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sameer-sharma-9720a022a",
  },
  {
    name: "Sanskar Pandey",
    image: "Sanskar.jpg",
    position: "PARLIAMENT REPRESENTATIVE",
    email: "mailto:sanskar.pandey.civ22@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sanskar-pandey-12687825b",
  },
];

export default function Team23(props) {
  const [imageLinks, setImageLinks] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchImageLinks = async () => {
      const folderName = "Team2023";
      const folderRef = ref(StorageDB, folderName);
      try {
        const listResult = await listAll(folderRef);
        const imageUrls = await Promise.all(
          listResult.items.map(async (itemRef) => {
            const imageName = itemRef.name;
            const url = await getDownloadURL(itemRef);
            return { name: imageName, url };
          })
        );
        setImageLinks(imageUrls);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.error('Error getting image URLs:', error);
      }
    };

    fetchImageLinks();
  }, []);

  return (
 <div
      className={"container"}
      style={{
        margin: "80px auto",
      }}
    >
{isLoading ? 
        <img
        className="block mx-auto"
          src="/loading.gif"
          width="300"
          alt="Loading..."
          height="300"
        />
    :
      <div className={"row"}>
        <h2
          style={{
            fontSize: "1.4rem",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          TEAM OF 2023-24
        </h2>
        <div className="team-container">
          {presidents.map((president, index) => {
            const imageUrl = (imageLinks.find(image=>image.name==president.image))|| '/path/to/default/image.png';  // Use a default image if URL is not available
           console.log(imageUrl)
            return (
              <div className="our-team" key={index}>
                <Image
                  src={imageUrl.url}
                  height={1600}
                  width={1600}
                  className="img-responsive img-contain"
                  alt={president.name}
                />
                <div className="team-content">
                  <h3 className="name">{president.name}</h3>
                  <span className="post">{president.post}</span>
                  <div className="team-social">
                    <a
                      href={president.email}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GrMail className="social-icons" />
                    </a>
                    <a
                      href={president.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icons" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="team-container-1">
          {verticalHeads.map((head, index) => {
            const imageUrl = (imageLinks.find(image=>image.name==head.image))  || '/path/to/default/image.png';  // Use a default image if URL is not available
            return (
              <div className="our-team" key={index}>
                <Image
                  src={imageUrl.url}
                  height={1600}
                  width={1600}
                  className="img-responsive img-contain"
                  alt={head.name}
                />
                <div className="team-content">
                  <h3 className="name">{head.name.toUpperCase()}</h3>
                  <span className="post">{head.position}</span>
                  <div className="team-social">
                    <a
                      href={head.email}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GrMail className="social-icons" />
                    </a>
                    <a
                      href={head.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icons" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>}
    </div>
  );
}
