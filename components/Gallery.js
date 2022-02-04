import { ReactPhotoCollage } from "react-photo-collage";
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
    title:
      "i am very good ankjba adgd gygduyd guygduav agyuaguva",
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
  },
];

export const Esummit = () => {
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
        <img
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
      <Gallery photos={photos.slice(0, 8)} renderImage={imageRenderer} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
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
        <img
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
      <Gallery photos={photos.slice(0, 8)} renderImage={imageRenderer} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
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
export const Workshops = () => {
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
        <img
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
      <Gallery photos={photos.slice(0, 8)} renderImage={imageRenderer} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
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
export const GuestLectures = () => {
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
        <img
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
      <Gallery photos={photos.slice(0, 8)} renderImage={imageRenderer} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
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