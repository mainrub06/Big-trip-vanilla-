export const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getClearDuration = (timeStart, timeEnd) => {
  const HOURS_IN_DAY = 12;
  const MINUTES_IN_HOUR = 60;
  let hoursDuration = timeEnd[0] - timeStart[0];
  let minutesDuration = timeEnd[1] - timeStart[1];
  if(hoursDuration < 0) {
    hoursDuration =+  HOURS_IN_DAY;
  }
  if(minutesDuration < 0) {
    minutesDuration =+ MINUTES_IN_HOUR;
  }

  return {
    hours: hoursDuration,
    minutes: minutesDuration
  }
}

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

export const event = (type, event, element,  ) => {

}
