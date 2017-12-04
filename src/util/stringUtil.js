export const setIn = (str, index, other) => {
  return `${str.slice(0, index)}${other}${str.slice(index + 1)}`;
};

export const countNot = char => str => {
  let res = 0;

  for (let i = 0, len = str.length; i < len; i++) {
    if (str[i] !== char) {
      res += 1;
    }
  }
  return res;
};
