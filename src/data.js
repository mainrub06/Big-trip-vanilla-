import {random} from "../src/utils.js";

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

const TIME_SHIFT = 2 * 60 * 60 * 1000;
const TIME_OPTIONS = {hour: `numeric`, minute: `numeric`, hour12: false};

export const DATA_POINTS = {
  POINTS_TYPE: {
    'Taxi': `🚕`,
    'Bus': `🚌`,
    'Train': `🚂`,
    'Ship': `🛳️`,
    'Transport': `🚊`,
    'Drive': `🚗`,
    'Flight': `✈️`,
    'Check-in': `🏨`,
    'Sightseeing': `🏛️`,
    'Restaurant': `🍴`,
  },
  CITIES: [`Moscow`, `Monterrey`, `Washington`, `Paris`, `London`, `Frankfurt`, `Florence`, `Rom`, `Velington`],
  OFFERS: [[`Add luggage`, 15], [`Switch to comfort class`, 55], [`Add meal`, 76], [`Choose seats`, 33]],
  DESCRIPTION_TEXT: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
};

const convertTime = (time, options, locale = `en-US`) => new Date(time).toLocaleString(locale, options);

const getRandomOffers = (offers) => {
  const arrayOffers = [];
  for (let item = 0; item < random(0, 2); item++) {
    arrayOffers.push(offers[random(0, offers.length)]);
  }
  return arrayOffers;
};

console.log(getRandomOffers(DATA_POINTS.OFFERS));

const getTimePoints = () => {
  const timePoint = Date.now();
  const timeStart = convertTime(timePoint, TIME_OPTIONS);
  const timeEnd = convertTime(timePoint + TIME_SHIFT, TIME_OPTIONS);
  return [timeStart, timeEnd];
};

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomTypePoint = () => {
  let resArr = getRandomArrayItem(Object.entries(DATA_POINTS.POINTS_TYPE));
  return {
    typeName: resArr[0],
    icon: resArr[1]
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
  city: DATA_POINTS.CITIES[random(0, DATA_POINTS.CITIES.length)],
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  price: random(10, 40),
  duration: `1h 00m`,
  offers: getRandomOffers(DATA_POINTS.OFFERS),
  description: getRandomDescription(DATA_POINTS.DESCRIPTION_TEXT)
});
