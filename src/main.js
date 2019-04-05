import {Filter} from '../src/filter.js';
import { FILTERS_ARRAY, localData } from '../src/data.js';
import { random, deletePoint } from '../src/utils.js';
import { EventItem } from '../src/eventItem.js';
import { EventItemEdit } from '../src/eventItemEdit.js';

const filtersBlock = document.querySelector(`.trip-filter`);

FILTERS_ARRAY.forEach((it) => {
  const filter = new Filter(it);
  filter.render();
  filtersBlock.appendChild(filter.element);

  filter.onFilter = () => {

  };
});


// const renderFilters = function (element) {
//   const filter = document.createElement(`template`);
//   filter.innerHTML = filterTemplate(element);
//   filtersBlock.appendChild(filter.content);
// };

// const removeFilters = () => {
//   let filters = document.querySelectorAll(`.trip-point`);
//   let filtersEdit = document.querySelectorAll(`.point`);
//   if (filters) {
//     filters.forEach(function (item) {
//       item.remove();
//     });
//   }
//   if (filtersEdit) {
//     filtersEdit.forEach(function (item) {
//       item.remove();
//     });
//   }
// };


// const renderRandomPoints = (num, array) => {
//   removeFilters();
//   for (let i = 0; i < random(0, num); i++) {
//     renderPointItem(array[i]);
//   }
// };

// filtersBlock.addEventListener(`click`, () => {
//   renderRandomPoints(7, localData);
// });

// FILTERS_ARRAY.forEach((item) => {
//   renderFilters(item);
// });


const renderPoints = (events) => {
  const pointsBlock = document.querySelector(`.trip-day__items`);

  for (const event of events) {
    const point = new EventItem(event);
    const pointEdit = new EventItemEdit(event);
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
      deletePoint(localData, pointEdit);
      pointsBlock.removeChild(pointEdit.element);
      pointEdit.unrender();
    };
  };
};


renderPoints(localData);
