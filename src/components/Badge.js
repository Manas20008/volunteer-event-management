import React from "react";
import Chip from "@mui/material/Chip";

function Badge({ label }) {
  return (
    <Chip
      label={label}
      color="primary"
      variant="outlined"
      style={{ marginRight: 8, marginBottom: 8 }}
    />
  );
}

export default Badge;
