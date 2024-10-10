export function convertToHexCode(str: string): {
  backgroundColor: string;
  textColor: string;
} {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate the color
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  const backgroundColor = `#${'00000'.substring(0, 6 - color.length) + color}`;

  // Convert the color to RGB for brightness calculation
  const r = parseInt(backgroundColor.substring(1, 3), 16);
  const g = parseInt(backgroundColor.substring(3, 5), 16);
  const b = parseInt(backgroundColor.substring(5, 7), 16);

  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Determine text color based on brightness
  const textColor = brightness > 128 ? '#6F6F6F' : '#F5F6FA';

  return { backgroundColor, textColor };
}
