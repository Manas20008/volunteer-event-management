import React from "react";
import { Card, CardContent, CardMedia, CardActions, Typography } from "@mui/material";
import CustomButton from "../components/Button";

function EventCard({ event, onEdit, onDelete, disabled }) {
  return (
    <Card>
      {event.imageUrl ? (
        <CardMedia component="img" height="140" image={event.imageUrl} alt={event.title} />
      ) : (
        <CardMedia component="img" height="140" image="https://via.placeholder.com/400x140?text=No+Image" alt="placeholder" />
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
        <CustomButton size="small" label="Edit" onClick={() => onEdit(event)} variant="text" disabled={disabled} />
        <CustomButton size="small" label="Delete" onClick={() => onDelete(event.id)} color="error" variant="text" disabled={disabled} />
      </CardActions>
    </Card>
  );
}

export default EventCard;
