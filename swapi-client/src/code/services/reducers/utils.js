const createActions = (prefix, stringArray) => {
  let output = {};
  stringArray.forEach(str => {
    const key = `${prefix}_${str}`;
    output[str] = key;
  });
  return output;
};

export { createActions };
