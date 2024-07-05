import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { GrMail } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { StorageDB } from "@/lib/firebase";
const presidents = [
  {
    name: "AMIT KUMAR BAHETI",
    image: "Amit.jpg",
    post: "VICE PRESIDENT E-CELL",
    email:
      "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=amit.krbaheti.eee19@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/amitkumarbaheti/",
    twitter: "https://twitter.com/amit_baheti_",
  },
  {
    name: "TANAYA MUJUMDAR",
    image: "Tanaya.jpg",
    post: "ASSOCIATE VICE PRESIDENT E-CELL",
    email: "mailto:mujumdartanaya@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanaya-mujumdar-80aa17207",
    twitter: "https://twitter.com/TanayaMujumdar",
  },
];
const verticalHeads = [
  {
    name: "TANYA GUPTA",
    image: "Tanya.jpeg",
    position: "BRANDING HEAD",
    email: "mailto:tanya.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/tanya-gupta-215942214",
    twitter:
      "https://twitter.com/TanyaGu27136914?t=pBdV1Hb-cSR19h2Zcqr9Yg&s=08",
  },
  {
    name: "PARTH GUPTA",
    image: "Parth.jpg",
    position: "SAP HEAD",
    email: "mailto:parthsanjeev.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/parthgupta03/",
    twitter: "https://twitter.com/ParthG03",
  },
  {
    name: "ASHWAT KUMAR SINGH",
    image: "Ashwat.jpg",
    position: "TECH HEAD",
    email: "mailto:ashwat.kumarsingh.met20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/ashwat-singh/",
    twitter: "https://twitter.com/ashwat_singh",
  },
  {
    name: "SHREYA JAIN",
    image: "Shreya.jpg",
    position: "EVENTS HEAD",
    email: "mailto:shreya.jain.cd.eee20@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/shreya-jain-/",
    twitter: "https://twitter.com/shreyaj90",
  },
  {
    name: "VANSHIKA GUPTA",
    image: "Vanshika.jpg",
    position: "STRATEGIC RELATIONS HEAD",
    email: "mailto:vanshika.gupta.met20@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/vanshika-gupta-299001201",
    twitter: "https://twitter.com/vanshika130502",
  },
  {
    name: "DIVYANSH THAKRE",
    image: "Divyansh.jpg",
    position: "INNOVATION & INCUBATION HEAD",
    email: "mailto:divyansh.thakre.civ20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/divyanshthakre/",
    twitter: "https://twitter.com/Divyansh_03",
  },
];
export default function Team22(props) {
  const [imageLinks, setImageLinks] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchImageLinks = async () => {
      const folderName = "Team2022";
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
    isLoading ? 
      
        <img
       className="block mx-auto"
          src="/loading.gif"
          width="300"
          alt="Loading..."
          height="300"
        />
    : <div
      className={"container"}
      style={{
        margin: "80px auto",
      }}
    >
      <div className={"row"}>
        <h2
          style={{
            fontSize: "1.4rem",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          TEAM OF 2022-23
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
      </div>
    </div>
  );
}
