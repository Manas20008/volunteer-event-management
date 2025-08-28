import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function EventCard({ title, description, location, date, onSignUp }) {
  
  // Calls the passed onSignUp handler with title when clicked
  const handleSignUpClick = () => {
    if (onSignUp) {
      onSignUp(title);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "20px auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">📍 {location}</Typography>
        <Typography variant="body2" color="text.secondary">🗓 {date}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
