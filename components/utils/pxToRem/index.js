export const pxToRem = (pxValue) => {
  // Get the base font size
  const baseFontSize = 16;

  // Convert pixels to rem
  const remValue = pxValue / baseFontSize;

  return remValue;
};
