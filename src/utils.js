export const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
