import Hall from "./hall.jpg";

export default function Home() {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Welcome!</h3>
      <img
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
        src={Hall}
      />
    </>
  );
}
