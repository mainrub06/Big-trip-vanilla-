import {
  random,
  getRandomArrayItem,
  getRandomArray
} from "../src/utils.js";

export const FILTERS_ARRAY = [{
  name: `everything`,
  check: true
},
{
  name: `future`
},
{
  name: `past`
}
];

const timeShift = () => {
  const hours = random(0, 24);
  const min = random(1, 60);
  const timeMs = (hours * 60 * 60 * 1000) + (min * 60 * 1000);

  return [hours, min, timeMs];
};

export const DATA_POINTS = {
  POINTS_TYPE: {
    'taxi': `🚕`,
    'bus': `🚌`,
    'train': `🚂`,
    'ship': `🛳️`,
    'transport': `🚊`,
    'drive': `🚗`,
    'flight': `✈️`,
    'check-in': `🏨`,
    'sightseeing': `🏛️`,
    'restaurant': `🍴`,
  },
  CITIES: [`Moscow`, `Monterrey`, `Washington`, `Paris`, `London`, `Frankfurt`, `Florence`, `Rom`, `Velington`],
  OFFERS: [{
    name: `Add luggage`,
    price: random(5, 100),
    checked: true
  },
  {
    name: `Switch to comfort class`,
    price: random(5, 100),
    checked: true
  },
  {
    name: `Add meal`,
    price: random(5, 100),
    checked: true
  },
  {
    name: `Choose seats`,
    price: random(5, 100),
    checked: true
  }],
  DESCRIPTION_TEXT: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
};

const getTimePoints = () => {
  const timePoint = Date.now();
  const duration = timeShift();
  const timeStart = timePoint;
  const timeEnd = timePoint + duration[2];

  return [timeStart, timeEnd];
};

const getRandomTypePoint = () => {
  let [typeName, icon] = getRandomArrayItem(Object.entries(DATA_POINTS.POINTS_TYPE));
  return {
    typeName,
    icon
  };
};

const getRandomDescription = (text) => {
  let arrStr = text.split(`. `);
  let result = new Set();
  let size = random(0, 3);
  for (let item = 0; item <= size; item++) {
    result.add(arrStr[random(0, arrStr.length)]);
  }
  return [...result].join(` `);
};

export const makeRandomEvent = () => ({
  type: getRandomTypePoint(),
  time: getTimePoints(),
  city: DATA_POINTS.CITIES[random(0, DATA_POINTS.CITIES.length - 1)],
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  price: random(10, 40),
  offers: getRandomArray(DATA_POINTS.OFFERS, 2),
  description: getRandomDescription(DATA_POINTS.DESCRIPTION_TEXT)
});
