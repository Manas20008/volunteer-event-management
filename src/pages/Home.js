import React from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

function Home() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20, maxWidth: 600, margin: "20px auto" }}>
        <h1 style={{ textAlign: "center" }}>Welcome to ServeSphere</h1>
        <p style={{ textAlign: "center" }}>
          Your gateway to volunteering and community engagement.
        </p>

        <EventCard
          title="Beach Cleanup Drive"
          description="Join us to clean the local beach area. Gloves and bags provided!"
          location="Sunny Beach Park"
          date="September 15, 2025"
        />
      </div>
    </>
  );
}

export default Home;
