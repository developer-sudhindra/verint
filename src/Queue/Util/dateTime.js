export const formatExpectedTime = (isoString) => {
  const date = new Date(isoString);

  // Use UTC time parts to avoid local timezone shifts
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12

  return `${hours}:${minutes} ${ampm}`;
};
