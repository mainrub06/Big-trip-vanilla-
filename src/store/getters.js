import _ from 'lodash';
import state from './state';

const getTotalPriceByPoint = (point) => {
  const offersPrice = point.offers
    .filter((offer) => offer.accepted)
    .reduce((total, offer) => {
      return total + offer.price;
    }, 0);

  return offersPrice + point.price;
};

const getTimestampByPoint = (point) => {
  const date = new Date(point.time[0]);

  date.setHours(0, 0, 0, 0);

  return date.getTime();
};

export const getTotalPrice = () => {
  return state.points.reduce((total, point) => {
    return total + getTotalPriceByPoint(point);
  }, 0);
};

export const getPointGroups = () => {
  const groups = _.groupBy(state.points, getTimestampByPoint);

  return Object.entries(groups)
    .map((entry) => {
      const [timestamp, points] = entry;

      return {
        points,
        timestamp
      };
    });
};
