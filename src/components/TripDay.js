import { format } from "date-fns";
import { Component } from "../core/Component";
import EventItem from "./EventItem";
import EventItemEdit from "./EventItemEdit";

import { deletePoint } from "../utils/utils";

import { runAction } from "../store/actions";
import * as actionTypes from "../store/action-types";

const $totalPriceBlock = document.querySelector(`.trip`);

export default class TravelDay extends Component {
  constructor(data, destinations, offers) {
    super();
    this._data = data;
    this._destinations = destinations;
    this._offers = offers;

    this._points = [];
    this._element = null;
    this._onRemove = null;
    this._onSorting = null;
  }

  set onRemove(fn) {
    this._onRemove = fn;
  }

  set onSorting(fnc) {
    this._onSorting = fnc;
  }

  renderPoints() {
    const pointsData = this._onSorting
      ? this._onSorting(this._data.points)
      : this._data.points;
    const $items = this._element.querySelector(`.trip-day__items`);

    this._points = pointsData.map((data) => {
      const eventItem = new EventItem(data);
      const eventItemEdit = new EventItemEdit(
        data,
        this._destinations,
        this._offers
      );

      eventItem.render();
      $items.appendChild(eventItem.element);
      runAction(actionTypes.COUNT_PRICE, $totalPriceBlock);

      eventItem.onEdit = () => {
        eventItemEdit.render();
        $items.replaceChild(eventItemEdit.element, eventItem.element);
        eventItem.unrender();
      };

      eventItemEdit.onSubmit = (newData) => {
        eventItem.update(newData);
        eventItemEdit.update(newData);
        runAction(actionTypes.UPDATE_POINT_DATA, newData);
        runAction(actionTypes.COUNT_PRICE, $totalPriceBlock);
        eventItem.render();
        $items.replaceChild(eventItem.element, eventItemEdit.element);
        eventItemEdit.unrender();
      };

      eventItemEdit.onDelete = () => {
        deletePoint(pointsData, eventItemEdit);
        $items.removeChild(eventItemEdit.element);
        runAction(actionTypes.REMOVE_POINT, eventItemEdit.element.id);
        eventItemEdit.unrender();

        if (this._data.points.length === 0) {
          this.unrender();
        }
      };

      return eventItem;
    });
  }

  unrenderPoints() {
    const points = this._points;

    if (this._data.points.length !== 0) {
      points.forEach((point) => {
        point.unrender();
      });
    }

    this._points = [];
    if (this._onRemove) {
      this._onRemove();
    }
  }

  bind() {
    this.renderPoints();
  }

  unbind() {
    this.unrenderPoints();
  }

  get template() {
    const date = new Date(Number(this._data.timestamp));

    return `<section class="trip-day">
              <article class="trip-day__info">
                <span class="trip-day__caption">Day</span>
                <p class="trip-day__number">${format(date, "dd")}</p>
                <h2 class="trip-day__title">${format(date, "MMMMM yyyy")}</h2>
              </article>
              <div class="trip-day__items"></div>
            </section>`.trim();
  }
}
