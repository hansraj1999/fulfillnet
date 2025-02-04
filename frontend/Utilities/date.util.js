export const isoDateConverter = (iso, type = "") => {
  let finalDate = "";
  const isLocalizedDateString = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(iso);
  const isLocalizedDateTimeString =
    /^\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)$/.test(iso);

  if (isLocalizedDateString || isLocalizedDateTimeString) {
    finalDate = iso.toUpperCase();
  } else if (isNaN(new Date(iso).getTime())) {
    finalDate = "INVALID DATE";
  } else if (type === "date") {
    finalDate = new Date(iso)
      .toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata", hour12: true })
      .toUpperCase();
  } else {
    finalDate = new Date(iso)
      .toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true })
      .toUpperCase();
  }

  return finalDate;
};
