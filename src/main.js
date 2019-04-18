import {
  Filter
} from '../src/filter.js';
import {
  FILTERS_ARRAY,
  localData
} from '../src/data.js';
import {
  removeElements,
  deletePoint
} from '../src/utils.js';
import {
  EventItem
} from '../src/eventItem.js';
import {
  EventItemEdit
} from '../src/eventItemEdit.js';
import {
  forLinter
} from '../src/stat.js';
import API from '../src/rest.js';
import * as state from '../src/store/state.js';


const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = ` https://es8-demo-srv.appspot.com/big-trip/`;
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });
const filtersBlock = document.querySelector(`.trip-filter`);

export const renderFilters = (events) => {
  FILTERS_ARRAY.forEach((it) => {
    const filter = new Filter(it);
    filter.render();
    filtersBlock.appendChild(filter.element);

    filter.onFilter = () => {
      const filteredArray = filter.getFilteredArray(events);
      removeElements(`.trip-point`, `.point`);
      renderPoints(filteredArray);
    };
  });
};

export const renderPoints = (events) => {
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
      deletePoint(events, pointEdit);
      pointsBlock.removeChild(pointEdit.element);
      pointEdit.unrender();
    };
  }
};

document.addEventListener(`DOMContentLoaded`, () => {
  api.getDestinations()
    .then((data) => {
      state.default.destionations = data;
    });

  api.getOffers()
    .then((data) => {
      state.default = {offers: data};
    });

  api.renderPoints()
    .then((data) => {
      state.default.points = data;
    });

  api.renderFilters();

});
console.log(state.default);

// renderPoints(state.points);



const tableBtn = document.querySelector(`.view-switch__item:first-child`);
const statBtn = document.querySelector(`.view-switch__item:nth-child(2)`);
const tableBlock = document.querySelector(`.main`);
const statBlock = document.querySelector(`.statistic`);

const onTableBtn = () => {
  statBtn.classList.remove(`view-switch__item--active`);
  tableBtn.classList.add(`view-switch__item--active`);
  tableBlock.classList.remove(`visually-hidden`);
  statBlock.classList.add(`visually-hidden`);
  tableBtn.removeEventListener(`click`, onTableBtn);
  statBtn.addEventListener(`click`, onStatBtn);
};

const onStatBtn = () => {
  statBtn.classList.add(`view-switch__item--active`);
  tableBtn.classList.remove(`view-switch__item--active`);
  tableBlock.classList.add(`visually-hidden`);
  statBlock.classList.remove(`visually-hidden`);

  statBtn.removeEventListener(`click`, onStatBtn);
  tableBtn.addEventListener(`click`, onTableBtn);
};

statBtn.addEventListener(`click`, onStatBtn);

forLinter();
