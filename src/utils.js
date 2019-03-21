export const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


const shuffle = (arr) => {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

export const getRandomArray = (arr, num) => {
  const newArray = shuffle(arr);
  return newArray.slice(0, num);
};

export const createElement = function (element) {
  const point = document.createElement(`template`);
  point.innerHTML = element;
  return point.content;
};
