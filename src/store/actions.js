import state from './state';
import observer from './observer';
import * as actionTypes from './action-types';

import API from '../../src/rest.js';
const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = ` https://es8-demo-srv.appspot.com/big-trip/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

export const actions = {
  [actionTypes.FETCH_ALL_DATA]() {
    Promise.all([
      api.getPoints(),
      api.getOffers(),
      api.getDestinations()
    ])
      .then((data) => runAction(actionTypes.SET_ALL_DATA, data));
  },

  [actionTypes.SET_ALL_DATA]([points, offers, destinations]) {
    state.points = points;
    state.offers = offers;
    state.destinations = destinations;
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
