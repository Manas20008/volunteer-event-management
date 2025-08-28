import React from "react";
import Button from "@mui/material/Button";

/**
 * Custom reusable Button component.
 * 
 * Props:
 * - color: Material UI color (primary, secondary, error, etc.)
 * - label: Button text
 * - onClick: Function to call on click
 * - variant: Button variant (contained, outlined, text)
 * - fullWidth: Boolean to make button full width
 * - type: Button type (submit, button, etc.)
 * - size: Button size (small, medium, large)
 */
function CustomButton({
  color = "primary",
  label,
  onClick,
  variant = "contained",
  fullWidth = false,
  type = "button",
  size = "medium",
}) {
  return (
    <Button
      color={color}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
      size={size}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
