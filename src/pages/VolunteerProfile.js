import React from "react";
import Navbar from "../components/Navbar";
import Badge from "../components/Badge";

function VolunteerProfile() {
  const badges = ["Helpful Hand", "Event Champion", "Community Star"];

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: 600, margin: "20px auto" }}>
        <h1>Jane Doe</h1>
        <p>Passionate volunteer focused on environmental and social causes.</p>

        <h3>Badges Earned</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {badges.map((b, index) => (
            <Badge key={index} label={b} />
          ))}
        </div>
      </div>
    </>
  );
}

export default VolunteerProfile;
