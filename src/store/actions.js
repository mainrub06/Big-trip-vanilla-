import state from './state';
import observer from './observer';
import * as actionTypes from './action-types';
import API from '../../src/rest.js';
import { toRow } from '../../src/rest.js';
import { renderPoints } from '../../src/main.js';

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = ` https://es8-demo-srv.appspot.com/big-trip/`;
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

export const actions = {
  [actionTypes.FETCH_ALL_DATA]() {
    Promise.all([
      api.getPoints(),
      api.getOffers(),
      api.getDestinations()
    ])
      .then((data) => runAction(actionTypes.SET_ALL_DATA, data));
  },

  [actionTypes.SET_POINT_DATA](data) {
    const index = state.points.findIndex((point) => point.id === data.id);

    if (index >= 0) {
      state.points[index] = data;
    }
  },

  [actionTypes.UPDATE_POINT_DATA](data) {
    api.updatePoint({ id: data.id, data })
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
    api.createPoint({ newData })
      .then(toRow);
  },

  [actionTypes.REMOVE_POINT](id) {
    state.points.splice(id, 1);
    renderPoints(state.points, state.destinations, state.offers);
    api.deleteTask({ id });
  }
};

export const runAction = (type, payload) => {
  const action = actions[type];

  if (!action) {
    return;
  }

  action(payload);
  observer.fire(type);
};
