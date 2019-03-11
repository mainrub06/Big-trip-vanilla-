import filterTemplate from '../src/filter.js';
import {makePoint} from '../src/point.js';
import {FILTERS_ARRAY, makeRandomEvent} from '../src/data.js';
import {random} from "../src/utils.js";

const filtersBlock = document.querySelector(`.trip-filter`);
const pointsBlock = document.querySelector(`.trip-day__items`);

const renderFilters = function (element) {
  const filter = document.createElement(`template`);
  filter.innerHTML = filterTemplate(element);
  filtersBlock.appendChild(filter.content);
};

const renderPoints = function (element) {
  const point = document.createElement(`template`);
  point.innerHTML = makePoint(element);
  pointsBlock.appendChild(point.content);
};

const removeFilters = () => {
  let filters = document.querySelectorAll(`.trip-point`);
  if (filters) {
    filters.forEach(function (item) {
      item.remove();
    });
  }
};

const renderRandomPoints = (num, array) => {
  removeFilters();
  for (let i = 0; i < random(0, num); i++) {
    renderPoints(array[i]);
  }
};

filtersBlock.addEventListener(`click`, () => {
  renderRandomPoints(7, eventsArr);
});

FILTERS_ARRAY.forEach((item) => {
  renderFilters(item);
});

const eventsArr = [];

for(let i = 0; i < 7; i++) {
  eventsArr.push(makeRandomEvent());
}

eventsArr.forEach((item) => {
  renderPoints(item);
});


