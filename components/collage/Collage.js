import Image from "next/image";
import startups from "../../public/startups.png"
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
      <h1>Successful ventures from IIT BHU Alumni</h1>
      <Image
        src={startups}
        alt="startups"
        height="1080"
        width="1920"
      ></Image>
    </div>
  );
};

export default Collage;
