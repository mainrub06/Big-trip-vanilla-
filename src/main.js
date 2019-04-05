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
  getStat
} from '../src/stat.js';

const filtersBlock = document.querySelector(`.trip-filter`);

FILTERS_ARRAY.forEach((it) => {
  const filter = new Filter(it);
  filter.render();
  filtersBlock.appendChild(filter.element);

  filter.onFilter = () => {
    const filteredArray = filter.getFilteredArray(localData);
    removeElements(`.trip-point`, `.point`);
    renderPoints(filteredArray);
  };
});
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
  }
};

renderPoints(localData);


const tableButton = document.querySelector(`.view-switch__item:first-child`);
