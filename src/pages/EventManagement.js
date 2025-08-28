import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import {
  Grid,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomButton from "../components/Button";

const socket = io("http://localhost:5000");

const AlertComponent = React.forwardRef(function Alert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const validate = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!description.trim()) errors.description = "Description is required";
    if (!location.trim()) errors.location = "Location is required";
    if (!date) errors.date = "Date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Unexpected error");
      showSnackbar(err.message || "Unexpected error", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    socket.on("eventsUpdated", (updatedEvents) => {
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      showSnackbar("Event list updated.", "info");
    });

    return () => {
      socket.off("eventsUpdated");
    };
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredEvents(
        events.filter(
          (ev) =>
            ev.title.toLowerCase().includes(lowerSearch) ||
            ev.location.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, events]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setImageUrl("");
    setFormErrors({});
    setIsEditing(false);
    setEditEventId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const eventData = { title, description, location, date, imageUrl };

    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:5000/api/events/${editEventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          showSnackbar("Error: " + errorData.message, "error");
          setSubmitting(false);
          return;
        }
        const updatedEvent = await response.json();
        setEvents(events.map((ev) => (ev.id === editEventId ? updatedEvent : ev)));
        showSnackbar("Event updated successfully");
      } else {
        response = await fetch("http://localhost:5000/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          showSnackbar("Error: " + errorData.message, "error");
          setSubmitting(false);
          return;
        }
        const createdEvent = await response.json();
        setEvents([...events, createdEvent]);
        showSnackbar("Event created successfully");
      }
      resetForm();
    } catch (error) {
      showSnackbar("Network error: " + error.message, "error");
    }
    setSubmitting(false);
  };

  const startEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setLocation(event.location);
    setDate(event.date);
    setImageUrl(event.imageUrl || "");
    setIsEditing(true);
    setEditEventId(event.id);
    setFormErrors({});
  };

  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json();
          showSnackbar("Error: " + errorData.message, "error");
          return;
        }
        setEvents(events.filter((ev) => ev.id !== id));
        if (isEditing && id === editEventId) resetForm();
        showSnackbar("Event deleted successfully");
      } catch (err) {
        showSnackbar("Network error: " + err.message, "error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" sx={{ px: { xs: 2, md: 0 }, mt: 4 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 3, textAlign: "center" }}
          >
            Manage Volunteer Events
          </Typography>

          <TextField
            label="Search events by title or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
          >
            <TextField
              label="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(formErrors.title)}
              helperText={formErrors.title}
              required
              fullWidth
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={Boolean(formErrors.description)}
              helperText={formErrors.description}
              required
              fullWidth
            />
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              error={Boolean(formErrors.location)}
              helperText={formErrors.location}
              required
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={Boolean(formErrors.date)}
              helperText={formErrors.date}
              required
              fullWidth
            />
            <TextField
              label="Image URL"
              placeholder="Optional"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />
            <CustomButton
              type="submit"
              label={isEditing ? "Update Event" : "Create Event"}
              disabled={submitting}
              fullWidth
            />
            {isEditing && (
              <CustomButton
                label="Cancel Edit"
                color="secondary"
                variant="outlined"
                onClick={resetForm}
                disabled={submitting}
                fullWidth
              />
            )}
          </Box>

          {loading && (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
              Loading events...
            </Typography>
          )}
          {error && (
            <Typography variant="body1" color="error" sx={{ textAlign: "center", mt: 3 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
              No events created yet.
            </Typography>
          )}

          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} key={event.id}>
                <Card>
                  {event.imageUrl ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.imageUrl}
                      alt={event.title}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://via.placeholder.com/400x140?text=No+Image"
                      alt="placeholder"
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {event.description}
                    </Typography>
                    <Typography variant="body2">📍 {event.location}</Typography>
                    <Typography variant="body2">🗓 {event.date}</Typography>
                  </CardContent>
                  <CardActions>
                    <CustomButton
                      size="small"
                      label="Edit"
                      onClick={() => startEdit(event)}
                      variant="text"
                      disabled={submitting}
                    />
                    <CustomButton
                      size="small"
                      label="Delete"
                      onClick={() => deleteEvent(event.id)}
                      color="error"
                      variant="text"
                      disabled={submitting}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <AlertComponent onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </AlertComponent>
      </Snackbar>
    </>
  );
}

export default EventManagement;


