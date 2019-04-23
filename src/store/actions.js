import state from './state';
import observer from './observer';
import * as actionTypes from './action-types';
import API from '../../src/rest.js';
import { toRow } from '../../src/rest.js';
import { renderPoints } from '../../src/main.js';
import {Price} from '../../src/total-price.js';

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

  [actionTypes.UPDATE_POINT_DATA](datas) {
    state.points[datas.id] = datas;
    api.updatePoint({ id: datas.id, data: datas })
      .then(toRow);
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
  },

  [actionTypes.COUNT_PRICE](block) {
    let totalPriceElement = document.querySelector(`.trip__total`);
    const totalPrice = new Price(state.points);
    totalPrice.render();
    block.replaceChild(totalPrice.element, totalPriceElement);
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
