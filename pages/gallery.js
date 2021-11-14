import Nav from "../components/navbar/NavLayout";
import Footer from "../components/Footer";
import Head from "next/head";
const Gallery = () => {
  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <Nav />
      <h1>Gallery</h1>
      <Footer />
    </>
  );
};

export default Gallery;
