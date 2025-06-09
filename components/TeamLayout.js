import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { GrMail } from "react-icons/gr";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { StorageDB } from "@/lib/firebase";

export default function TeamLayout({ teamData, showheading = true }) {
    const [imageLinks, setImageLinks] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    useEffect(() => {
        const fetchImageLinks = async () => {
            const folderName = teamData.year;
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

                {showheading && (
                    <h2
                        style={{
                            fontSize: "1.4rem",
                            textAlign: "center",
                            width: "100%",
                            fontWeight: "bold",
                        }}
                    >
                        TEAM OF {teamData.session}
                    </h2>
                )}
                <div className={"row"}>
                    <div className="team-container">
                        {teamData?.presidents.map((president, index) => {
                            const imageUrl = (imageLinks.find(image => image.name == president.image)) || '/path/to/default/image.png';  // Use a default image if URL is not available
                            // console.log(imageUrl)
                            return (
                                <div className="our-team" key={index}>
                                    <Image
                                        src={imageUrl.url}
                                        height={1600}
                                        width={1600}
                                        className="img-responsive img-contain"
                                        unoptimized
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
                                            {president.twitter && (
                                                <a
                                                    href={president.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaTwitter className="social-icons" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="team-container-1">
                        {teamData.verticalHeads.map((head, index) => {
                            const imageUrl = (imageLinks.find(image => image.name == head.image)) || '/path/to/default/image.png';  // Use a default image if URL is not available
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
                                            {head.twitter && (
                                                <a
                                                    href={head.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaTwitter className="social-icons" />
                                                </a>
                                            )}
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