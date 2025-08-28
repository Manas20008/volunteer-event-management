const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development. Restrict in production.
  },
});

app.use(cors());
app.use(express.json());

const events = [];

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Emit updated events to all connected clients
function emitEventsUpdate() {
  io.emit("eventsUpdated", events);
}

// Routes

app.get("/", (req, res) => {
  res.send("ServeSphere backend with real-time Socket.IO started");
});

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.post("/api/events", (req, res) => {
  const { title, description, location, date, imageUrl } = req.body;
  if (!title || !description || !location || !date) {
    return res.status(400).json({ message: "All fields except imageUrl are required." });
  }
  const newEvent = {
    id: Date.now(),
    title,
    description,
    location,
    date,
    imageUrl: imageUrl || "",
  };
  events.push(newEvent);
  emitEventsUpdate(); // Notify clients in real-time
  res.status(201).json(newEvent);
});

app.put("/api/events/:id", (req, res) => {
  const eventId = Number(req.params.id);
  const { title, description, location, date, imageUrl } = req.body;

  const eventIndex = events.findIndex((ev) => ev.id === eventId);
  if (eventIndex === -1) return res.status(404).json({ message: "Event not found." });

  events[eventIndex] = {
    id: eventId,
    title,
    description,
    location,
    date,
    imageUrl: imageUrl || "",
  };

  emitEventsUpdate();
  res.json(events[eventIndex]);
});

app.delete("/api/events/:id", (req, res) => {
  const eventId = Number(req.params.id);
  const eventIndex = events.findIndex((ev) => ev.id === eventId);
  if (eventIndex === -1) return res.status(404).json({ message: "Event not found." });

  events.splice(eventIndex, 1);
  emitEventsUpdate();

  res.json({ message: "Event deleted successfully." });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
