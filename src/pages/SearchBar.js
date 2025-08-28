import React from "react";
import { TextField } from "@mui/material";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Search events by title or location"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      sx={{ mb: 3 }}
    />
  );
}

export default SearchBar;
