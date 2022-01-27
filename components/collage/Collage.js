import Image from "next/image";
import startups from "../../public/startups.png";
import startups_mobile from "../../public/startups_mobile.png";
const Collage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        margin: "70px auto",
      }}
      className="collage-container"
    >
      <h1>Successful Ventures from IIT BHU Alumni</h1>
      <div className="collage">
        <Image src={startups} alt="startups" height="1080" width="1920"></Image>
      </div>
      <div className="collage-mobile">
        <Image
          src={startups_mobile}
          alt="startups"
          height="2925"
          width="2340"
        ></Image>
      </div>
    </div>
  );
};

export default Collage;
