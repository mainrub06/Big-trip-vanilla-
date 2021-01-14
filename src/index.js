import TripDay from "./components/TripDay";
import Filter from "./components/Filter";
import EventItemEdit from "./components/EventItemEdit";
import Price from "./components/Price";
import Stats from "./components/Stats";

import { EMPTY_POINT_DATA } from "./utils/utils";

import { FILTERS_ARRAY } from "./utils/data";

import observer from "./store/observer";
import state from "./store/state";
import * as getters from "./store/getters";
import * as actionTypes from "./store/action-types";
import { runAction } from "./store/actions";

const $filtersBlock = document.querySelector(`.trip-filter`);
const $buttonNewPoint = document.querySelector(`.new-event`);
const $pointsBlock = document.querySelector(`.trip-day__items`);
const $totalPriceBlock = document.querySelector(`.trip`);
const $tripPoints = document.querySelector(`.trip-points`);

export const renderFilters = () => {
  FILTERS_ARRAY.forEach((type) => {
    const filter = new Filter(type);

    filter.render();
    $filtersBlock.appendChild(filter.element);

    filter.onFilter = () => {
      runAction(actionTypes.SET_FILTERED_POINTS, type.name);
    };
  });
};

export const renderPoints = (events, destinations, offers) => {
  const groups = getters.getPointsGroups();

  groups.forEach((data) => {
    const tripDay = new TripDay(data, destinations, offers);

    tripDay.render();
    $tripPoints.appendChild(tripDay.element);
    tripDay.onRemove = () =>
      runAction(actionTypes.REMOVE_TRIP_DAY, [tripDay.element, $tripPoints]);
  });
};

let totalPrice;

const renderTotalPrice = () => {
  const totalPriceElement = document.querySelector(`.trip__total`);

  if (totalPrice) {
    totalPrice.unrender();
  }

  totalPrice = new Price(getters.getTotalPrice());
  totalPrice.render();

  $totalPriceBlock.replaceChild(totalPrice.element, totalPriceElement);
};

runAction(actionTypes.FETCH_ALL_DATA);

observer.on((type) => {
  if (type === `SET_ALL_DATA`) {
    renderPoints(state.points, state.destinations, state.offers);
    renderFilters(state.points, state.destinations, state.offers);
  }

  if ([`SET_ALL_DATA`, `SET_POINT_DATA`].includes(type)) {
    renderTotalPrice();
  }
});

$buttonNewPoint.addEventListener(`click`, () => {
  const newPointEdit = new EventItemEdit(
    EMPTY_POINT_DATA,
    state.destinations,
    state.offers
  );
  newPointEdit.render();
  $pointsBlock.insertBefore(newPointEdit.element, $pointsBlock.firstChild);

  newPointEdit.onSubmit = (newData) => {
    newData.id = `${state.points.length}`;
    runAction(actionTypes.PUSH_AND_RENDER_POINTS, newData);
  };

  newPointEdit.onDelete = () => {
    $pointsBlock.removeChild(newPointEdit.element);
  };
});

const tableBtn = document.querySelector(`.view-switch__item:first-child`);
const statBtn = document.querySelector(`.view-switch__item:nth-child(2)`);
const tableBlock = document.querySelector(`.main`);
const statBlock = document.querySelector(`.statistic`);

const onTableBtn = (e) => {
  e.preventDefault();
  statBtn.classList.remove(`view-switch__item--active`);
  tableBtn.classList.add(`view-switch__item--active`);
  tableBlock.classList.remove(`visually-hidden`);
  statBlock.classList.add(`visually-hidden`);
  tableBtn.removeEventListener(`click`, onTableBtn);
  statBtn.addEventListener(`click`, onStatBtn);
};

const onStatBtn = (e) => {
  e.preventDefault();
  statBtn.classList.add(`view-switch__item--active`);
  tableBtn.classList.remove(`view-switch__item--active`);
  tableBlock.classList.add(`visually-hidden`);
  statBlock.classList.remove(`visually-hidden`);
  statBtn.removeEventListener(`click`, onStatBtn);
  tableBtn.addEventListener(`click`, onTableBtn);
};

statBtn.addEventListener(`click`, onStatBtn);

const statInit = new Stats();
statInit.renderStats();
