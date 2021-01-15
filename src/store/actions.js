import state from "./state";
import observer from "./observer";
import * as actionTypes from "./action-types";
import API from "../../src/api";
import { toRow } from "../../src/api";
import { renderPoints } from "..";
import Filter from "../components/Filter";

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = ` https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

export const actions = {
  [actionTypes.FETCH_ALL_DATA]() {
    Promise.all([
      api.getPoints(),
      api.getOffers(),
      api.getDestinations(),
    ]).then((data) => runAction(actionTypes.SET_ALL_DATA, data));
  },

  [actionTypes.SET_POINT_DATA](data) {
    const index = state.points.findIndex((point) => point.id === data.id);

    if (index >= 0) {
      state.points[index] = { ...state.points[index], ...data };
    }
  },

  [actionTypes.UPDATE_POINT_DATA](data) {
    api
      .updatePoint({ id: data.id, data })
      .then((data) => runAction(actionTypes.SET_POINT_DATA, data));
  },

  [actionTypes.SET_ALL_DATA]([points, offers, destinations]) {
    state.points = points;
    state.offers = offers;
    state.destinations = destinations;
  },

  [actionTypes.PUSH_AND_RENDER_POINTS](newData) {
    state.points.push(newData);

    // ToDo
    document.querySelector(".trip-points").innerHTML = "";

    console.log(state.points);

    renderPoints(
      state.points,
      state.destinations,
      state.offers,
      state.filters.sorting
    );
    api.createPoint({ newData });
  },

  [actionTypes.REMOVE_POINT](id) {
    const index = state.points.findIndex((point) => point.id === id);
    state.points.splice(index, 1);

    api.deleteTask({ id });
  },
  [actionTypes.REMOVE_TRIP_DAY]([child, parent]) {
    parent.removeChild(child);
  },
  [actionTypes.SET_FILTERED_POINTS](type) {
    // ToDo
    document.querySelector(".trip-points").innerHTML = "";

    if (type === "everything") {
      renderPoints(
        state.points,
        state.destinations,
        state.offers,
        state.filters.sorting
      );
    } else {
      const filteredArray = Filter.getFilteredArray(type, state.points);

      renderPoints(
        filteredArray,
        state.destinations,
        state.offers,
        state.filters.sorting
      );
    }
  },
  [actionTypes.SET_SORTING](type) {
    state.filters.sorting = type;
    document.querySelector(".trip-points").innerHTML = "";

    renderPoints(
      state.points,
      state.destinations,
      state.offers,
      state.filters.sorting
    );
  },
};

export const runAction = (type, payload) => {
  const action = actions[type];

  if (!action) {
    return;
  }

  action(payload);
  observer.fire(type);
};
