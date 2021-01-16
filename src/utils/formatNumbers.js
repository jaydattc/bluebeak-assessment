export const formatToTwoDigit = (n) =>
  parseFloat(n).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 0,
    useGrouping: false,
  });
export const formatToOneSF = (n) => parseFloat(n).toFixed(1) / 8; // get maximum value instead for better contrast
export const formatFractionToPercent = (n) => {
  const percentage = parseFloat(parseFloat(n) * 100);
  if (percentage >= 100) return "✓";
  if (percentage > 99) return "> 99 %";
  if (percentage < 99)
    return (
      percentage.toLocaleString("en-US", {
        maximumFractionDigits: 1,
        useGrouping: false,
      }) + "%"
    );
};
