import Image from "next/legacy/image";
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import { Modal, ModalGateway } from "react-images";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const founspeak = [
  {
    src: "/foundersSpeak/_DSC0008-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/foundersSpeak/_DSC0040-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/foundersSpeak/_DSC0055-min.jpg",
    width: 3,
    height: 2,
  },
];
const pitchingEvents = [
  {
    src: "/pitching_events/DSC04981-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/pitching_events/DSC05081-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/pitching_events/DSC_0092-2-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/pitching_events/hult1-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/pitching_events/DSC05026-min.jpg",
    width: 3,
    height: 2,
  },

  {
    src: "/pitching_events/DSC_0071-3-min.jpg",
    width: 3,
    height: 2,
  },

  {
    src: "/pitching_events/gsw-min.jpg",
    width: 3,
    height: 2,
  },
];
const mentorship = [
  {
    src: "/mentorship-Sessions/DSC04819-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/mentorship-Sessions/DSC_0094-3-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/mentorship-Sessions/slide6-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/mentorship-Sessions/DSC_006_mono-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/mentorship-Sessions/slide5-min.jpg",
    width: 1.75,
    height: 1,
  },
];
const incu = [
  {
    src: "/incubators/mciie2.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/incubators/rkvy1.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/incubators/rkvy12.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/incubators/slide7.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/incubators/thinq2.PNG",
    width: 1101,
    height: 584,
  },
  {
    src: "/incubators/mciie3.jpg",
    width: 1851,
    height: 989,
  },
  {
    src: "/incubators/rkvy11.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/incubators/rkvy4.jpg",
    width: 2,
    height: 1,
  },
  {
    src: "/incubators/thinq1.jpg",
    width: 1.56,
    height: 1,
  },
];

const electures = [
  {
    src: "/e-lectures/6-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/7-min.jpg ",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC04914-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC04931-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC04938-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC05063-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC05145-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC05459-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC05467-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC_0139-3-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/DSC_0142-5-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/_DSC0082-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/biz1 (3)-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/gsw2-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/slide4-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  ////
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },

  {
    src: "/e-lectures/stock-min.jpg",
    width: 4,
    height: 3,
  },
];
const esummit = [
  {
    src: "/e-summit/2-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/8-min.jpg ",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/9-min.jpg ",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC04546-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC05331-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC05337-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC05339-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_0018.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_0026-5.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_0044-6-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_0071-7 (1).jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_009-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_0099-8-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/DSC_0151-2-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/IMG-20200203-WA0147-min.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/_DSC0128 (1).jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/_DSC0310.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/_DSC0311.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/e-summit/mbg-min.jpg",
    width: 4,
    height: 3,
  },
];

const AlumniMeet = [
  {
    src: "/alumni_meet/5-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/alumni_meet/DSC_0074-5-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/alumni_meet/DSC_0534-min.jpg",
    width: 3,
    height: 2,
  },
  {
    src: "/alumni_meet/DSC_0549-min.jpg",
    width: 3,
    height: 2,
  },
];
export const AlumniMeetups = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );
  // return (
  //   <div>
  //     <Gallery photos={AlumniMeet} renderImage={imageRenderer} />
  //     <ModalGateway>
  //       {viewerIsOpen ? (
  //         <Modal onClose={closeLightbox}>
  //           <Carousel
  //             currentIndex={currentImage}
  //             views={AlumniMeet.map((x) => ({
  //               ...x,
  //               srcset: x.srcSet,
  //               caption: x.title,
  //             }))}
  //           />
  //         </Modal>
  //       ) : null}
  //     </ModalGateway>
  //   </div>
  // );
  const numRows = 2;



  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        showIndicators={false}
        autoPlay={true} // Enable automatic scrolling
        interval={3000}
      >
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {AlumniMeet.slice(rowIndex * 2, (rowIndex + 1) * 2).map((photo) => (
              <div
                key={photo.id}
                className="photo"
                style={{
                  "margin-bottom": "20px",
                  width: "calc(50% - 1px)",
                }}
              >
                <img src={photo.src} alt={photo.title} />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export const FoundersSpeak = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );
  return (
    <div>
      <Gallery photos={founspeak.slice(0, 8)} renderImage={imageRenderer} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={founspeak.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};
export const ESummit = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const numRows = 4;

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      showIndicators={false}
      autoPlay={true} // Enable automatic scrolling
      interval={3000}
    >
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {esummit.slice(rowIndex * 4, (rowIndex + 1) * 4).map((photo) => (
            <div
              key={photo.id}
              className="photo"
              style={{
                "margin-bottom": "20px",
                width: "calc(25% - 1px)",
              }}
            >
              <img src={photo.src} alt={photo.title} />
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export const MentorshipSessions = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );
  return (
    <div>
      <Gallery photos={mentorship.slice(0, 8)} renderImage={imageRenderer} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={mentorship.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export const PitchingEvents = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );
  return (
    <div>
      <Gallery
        photos={pitchingEvents.slice(0, 8)}
        renderImage={imageRenderer}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={pitchingEvents.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export const Incubators = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );
  const numRows = 3;
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      showIndicators={false}
      autoPlay={true} // Enable automatic scrolling
      interval={9000}
    >
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="row"
          style={{
            display: "flex",
          }}
        >
          {incu.slice(rowIndex * 3, (rowIndex + 1) * 3).map((photo) => (
            <div
              key={photo.id}
              className="photo"
              style={{
                "margin-bottom": "20px",
                width: "calc(33.33% - 1px)",
              }}
            >
              <img
                src={photo.src}
                alt={photo.title}
                style={{
                  height: "230px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export const ELectures = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const imgStyle = {
    transition:
      "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",

  };
  const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  const RenderImage = ({ index, photo, margin }) => {
    const handleOnClick = (e) => {
      openLightbox(e, { photo, index });
    };

    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        className="test-shine"
      >
        <Image
          alt={photo.title}
          style={{ ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
      </div>
    );
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ index, key, photo }) => (
    <RenderImage key={key} margin={"2px"} index={index} photo={photo} />
  );
  const numRows = 4;
  return (
    <>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        showIndicators={false}
        autoPlay={true} // Enable automatic scrolling
        interval={4000}
      >
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{
              display: "flex",
            }}
          >
            {electures.slice(rowIndex * 3, (rowIndex + 1) * 3).map((photo) => (
              <div
                key={photo.id}
                className="photo"
                style={{
                  "margin-bottom": "20px",
                  width: "calc(33.33% - 1px)",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{
                    height: "230px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </Carousel>

      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        showIndicators={false}
        autoPlay={true} // Enable automatic scrolling
        interval={20000}
      >
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{
              display: "flex",
              objectFit: "cover",
            }}
          >
            {electures.slice(rowIndex * 4, (rowIndex + 1) * 4).map((photo) => (
              <div
                key={photo.id}
                className="photo"
                style={{
                  "margin-bottom": "20px",
                  width: "calc(25%)",
                }}
              >
                <img src={photo.src} alt={photo.title} style={{}} />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </>
  );
};
