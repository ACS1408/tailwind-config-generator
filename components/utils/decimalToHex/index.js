export const decimalToHex = (color) => {
  const alphaHex = (alpha) => {
    return alpha === 0
      ? "00"
      : alpha === 1
      ? ""
      : Math.round(255 * alpha).toString(16);
  };
  return `${color.hex}${alphaHex(color.rgb.a)}`;
};
