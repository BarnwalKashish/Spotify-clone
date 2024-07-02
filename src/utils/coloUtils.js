// utils/colorUtils.js

export const lighten = (color, percent) => {
    if (!color) return color; // Return early if color is undefined or falsy
    
    const lightenPercent = percent / 100;
    const rgbMatch = color.match(/\d+/g); // Match RGB values
    
    if (!rgbMatch || rgbMatch.length !== 3) return color; // Return original color if RGB values are not valid
    
    const newColor = `rgb(${rgbMatch.map(value => 
      Math.min(255, parseInt(value) + lightenPercent * 255)
    ).join(", ")})`;
  
    return newColor;
  };
  