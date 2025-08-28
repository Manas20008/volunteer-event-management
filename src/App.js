import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import VolunteerProfile from "./pages/VolunteerProfile";
import Chat from "./pages/Chat";
import EventManagement from "./pages/EventManagement";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<VolunteerProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/events/manage" element={<EventManagement />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

