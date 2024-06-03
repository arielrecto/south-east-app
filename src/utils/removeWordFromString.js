export const removeWordFromString = (str, word) => {
  const regex = new RegExp(`\\b${word}\\b`, "g");

  return str.replace(regex, "").replace(/\s+/g, " ").trim();
};
