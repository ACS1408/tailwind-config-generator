export const hexToRGBA = (hex, alpha) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits shorthand check
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits hex code
  else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    // Handle invalid hex color code
    throw new Error("Invalid hex color code");
  }

  // Check alpha value
  alpha = alpha || 1.0;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
