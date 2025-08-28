import React from "react";
import { Box, TextField } from "@mui/material";
import CustomButton from "../components/Button";

function EventForm({
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  date,
  setDate,
  imageUrl,
  setImageUrl,
  formErrors,
  handleSubmit,
  isEditing,
  submitting,
  resetForm,
}) {
  return (
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
  );
}

export default EventForm;
