import filterTemplate from '../src/filter.js';
import pointTemplate from '../src/point.js';

const filtersBlock = document.querySelector(`.trip-filter`);
const pointsBlock = document.querySelector(`.trip-day__items`);

const FILTERS_ARRAY = [{
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

const POINT_ARRAY = [{
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  },
  {
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  },
  {
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  },
  {
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  },
  {
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  },
  {
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  },
  {
    icon: `🚕`,
    title: `Check into a hotel`,
    start: `10:00`,
    end: `11:00`,
    hours: `1h 30m`,
    price: `20`
  }
];

const renderFilters = function (element) {
  const filter = document.createElement(`template`);
  filter.innerHTML = filterTemplate(element);
  filtersBlock.appendChild(filter.content);
};

const renderPoints = function (element) {
  const point = document.createElement(`template`);
  point.innerHTML = pointTemplate(element);
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
  let random = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }
  removeFilters();
  for (let i = 0; i < random(0, num); i++) {
    renderPoints(array[i]);
  }
}

filtersBlock.addEventListener(`click`, () => {
  renderRandomPoints(7, POINT_ARRAY);
});

FILTERS_ARRAY.forEach(item => {
  renderFilters(item);
});

POINT_ARRAY.forEach(item => {
  renderPoints(item);
});
