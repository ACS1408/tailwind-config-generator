export const hexToRGBA = (hex) => {
  let r = 0,
    g = 0,
    b = 0,
    alpha = 1.0;
  if (hex?.startsWith("transparent")) {
    (r = 0), (g = 0), (b = 0), (alpha = 0);
  }
  // 3 digits shorthand check
  else if (hex?.length === 4 || hex?.length === 5) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);

    if (hex?.length === 5) {
      alpha = parseInt(hex[4] + hex[4], 16) / 255;
    }
  }
  // 6 digits hex code
  else if (hex?.length === 7 || hex?.length === 9) {
    r = parseInt(hex?.slice(1, 3), 16);
    g = parseInt(hex?.slice(3, 5), 16);
    b = parseInt(hex?.slice(5, 7), 16);

    if (hex?.length === 9) {
      alpha = parseInt(hex?.slice(7, 9), 16) / 255;
    }
  }
  // 8 digits hex code
  else if (hex?.length === 8) {
    r = parseInt(hex?.slice(2, 4), 16);
    g = parseInt(hex?.slice(4, 6), 16);
    b = parseInt(hex?.slice(6, 8), 16);
    alpha = parseInt(hex?.slice(7, 8), 16) / 255;
  } else {
    // Handle invalid hex color code
    console.error("Invalid hex color code");
    // throw new Error("Invalid hex color code");
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha?.toFixed(2)})`;
};
