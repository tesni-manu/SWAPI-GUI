const isNotEmptyString = str => str !== "";
const trim = str => str.trim();
const toTitleCase = word =>
  word.toUpperCase() === word
    ? word
    : word[0].toUpperCase() + word.substr(1).toLowerCase();
const commonWords = ["of", "in", "a", "the", "an"];
const isCommonWord = word => commonWords.indexOf(word) >= 0;
const toDisplayName = codedName =>
  codedName
    .split("_")
    .map(trim)
    .filter(isNotEmptyString)
    .map((word, i) =>
      i === 0 || !isCommonWord(word) ? toTitleCase(word) : word
    )
    .join(" ");

export { toDisplayName };
