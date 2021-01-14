export const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export const getRandomArrayItem = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getClearDuration = (timeStart, timeEnd) => {
  const HOURS_IN_DAY = 12;
  const MINUTES_IN_HOUR = 60;
  let hoursDuration = timeEnd[0] - timeStart[0];
  let minutesDuration = timeEnd[1] - timeStart[1];
  if (hoursDuration < 0) {
    hoursDuration = +HOURS_IN_DAY;
  }
  if (minutesDuration < 0) {
    minutesDuration = +MINUTES_IN_HOUR;
  }

  return {
    hours: hoursDuration,
    minutes: minutesDuration,
  };
};

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

export const deletePoint = (points, point) => {
  const index = points.findIndex((it) => it === point);
  points.splice(index, 1);
  return points;
};

export const removeElements = (class1, class2) => {
  let element = document.querySelectorAll(class1);
  let elementEdit = document.querySelectorAll(class2);

  if (element) {
    element.forEach(function (item) {
      item.remove();
    });
  }
  if (elementEdit) {
    elementEdit.forEach(function (item) {
      item.remove();
    });
  }
};

const sortByTime = (array) => array.sort((a, b) => a.time[0] - b.time[0]);

const sortByPrice = (array, type = "up") => {
  if (type !== "up") {
    return array.sort((a, b) => a.price - b.price);
  } else {
    return array.sort((a, b) => b.price - a.price);
  }
};

const sortByAlpabet = (array) =>
  array.sort((a, b) => {
    const fName = a.description.toLowerCase();
    const sName = b.description.toLowerCase();

    if (fName < sName) return -1;
    if (fName > sName) return 1;
    return 0;
  });

export const smartSorting = (array, type) => {
  switch (type) {
    case "event":
      return sortByAlpabet(array);
    case "time":
      return sortByTime(array);
    case "price":
      return sortByPrice(array);
    default:
      return array;
  }
};

export const EMPTY_POINT_DATA = {
  id: null,
  type: { typeName: `taxi`, icon: `🚕` },
  city: ``,
  destination: [],
  price: 0,
  time: [0, 0],
  pictures: [],
  offers: [],
  description: ``,
  favorite: false,
};
