import state from "./state";
import observer from "./observer";
import * as actionTypes from "./action-types";
import API from "../../src/api";
import { toRow } from "../../src/api";
import { renderPoints } from "..";
import Filter from "../components/Filter";

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = ` https://es8-demo-srv.appspot.com/big-trip/`;
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
      state.points[index] = data;
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
    renderPoints(state.points, state.destinations, state.offers);
    api.createPoint({ newData }).then(toRow);
  },

  [actionTypes.REMOVE_POINT](id) {
    state.points.splice(id, 1);
    api.deleteTask({ id });
  },
  [actionTypes.REMOVE_TRIP_DAY]([child, parent]) {
    parent.removeChild(child);
  },
  [actionTypes.SET_FILTERED_POINTS](type) {
    if (type === "everything") {
      renderPoints(state.points, state.destinations, state.offers);
    } else {
      const filteredArray = Filter.getFilteredArray(type, state.points);
      document.querySelector(".trip-points").innerHTML = "";
      renderPoints(filteredArray, state.destinations, state.offers);
    }
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
