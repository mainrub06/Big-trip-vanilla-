import filterTemplate from '../src/filter.js';
import {FILTERS_ARRAY, makeRandomEvent} from '../src/data.js';
import {random} from '../src/utils.js';
import {EventItem} from '../src/eventItem.js';
import {EventItemEdit} from '../src/eventItemEdit.js';

const filtersBlock = document.querySelector(`.trip-filter`);
const pointsBlock = document.querySelector(`.trip-day__items`);

const renderFilters = function (element) {
  const filter = document.createElement(`template`);
  filter.innerHTML = filterTemplate(element);
  filtersBlock.appendChild(filter.content);
};

const removeFilters = () => {
  let filters = document.querySelectorAll(`.trip-point`);
  let filtersEdit = document.querySelectorAll(`.point`);
  if (filters) {
    filters.forEach(function (item) {
      item.remove();
    });
  }
  if (filtersEdit) {
    filtersEdit.forEach(function (item) {
      item.remove();
    });
  }
};


const renderRandomPoints = (num, array) => {
  removeFilters();
  for (let i = 0; i < random(0, num); i++) {
    renderPointItem(array[i]);
  }
};

filtersBlock.addEventListener(`click`, () => {
  renderRandomPoints(7, eventsArr);
});

FILTERS_ARRAY.forEach((item) => {
  renderFilters(item);
});

const eventsArr = [];

for (let i = 0; i < 7; i++) {
  eventsArr.push(makeRandomEvent());
}

const renderPointItem = (item) => {
  const point = new EventItem(item);
  const pointEdit = new EventItemEdit(item);
  point.render();
  pointsBlock.appendChild(point.element);

  point.onEdit = () => {
    pointEdit.render();
    pointsBlock.replaceChild(pointEdit.element, point.element);
    point.unrender();
  };

  pointEdit.onSubmit = (newData) => {


    point.update(newData);
    pointEdit.update(newData);
    point.render();
    pointsBlock.replaceChild(point.element, pointEdit.element);
    pointEdit.unrender();
  };

  pointEdit.onDelete = () => {
    pointEdit.unrender();
    pointsBlock.remove(this);
  };
};

eventsArr.forEach((item) => {
  renderPointItem(item);
});
