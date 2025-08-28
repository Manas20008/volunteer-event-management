import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: 600, margin: "20px auto" }}>
        <h1>About ServeSphere</h1>
        <p>
          ServeSphere connects volunteers with meaningful social projects based on skills,
          location, and interests.
        </p>
      </div>
    </>
  );
}

export default About;
