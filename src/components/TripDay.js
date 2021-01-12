import { format } from "date-fns";
import { Component } from "../core/Component";
import EventItem from "./EventItem";

export default class TravelDay extends Component {
  constructor(data) {
    super();
    this._data = data;
    this._points = [];
  }

  renderPoints() {
    const pointsData = this._data.points;
    const $items = this._element.querySelector(`.trip-day__items`);
    
    this._points = pointsData.map((data) => {
      const eventItem = new EventItem(data);

      $items.appendChild(eventItem.render());

      return eventItem;
    });
  }

  unrenderPoints() {
    const points = this._points;

    points.forEach((point) => {
      point.unrender();
    });

    this._points = [];
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
                <p class="trip-day__number">${format(date, 'dd')}</p>
                <h2 class="trip-day__title">${format(date, 'MMMMM yyyy')}</h2>
              </article>
              <div class="trip-day__items"></div>
            </section>`.trim();
  }
}
