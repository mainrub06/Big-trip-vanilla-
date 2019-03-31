import {
  createElement,
  getClearDuration
} from "../src/utils.js";
import {
  Component
} from "../src/component.js";
import moment from "moment";

export class EventItem extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._time = data.time;
    this._picture = data.picture;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;

    this._element = null;
    this._state = {
      // Состояние компонента
    };
    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return /* html*/ `<article class="trip-point">
    <i class="trip-icon">${this._type.icon}</i>
    <h3 class="trip-point__title">${this._type.typeName} to ${this._city}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${this.maketime(this._time[0], this._time[1])}</span>
      <span class="trip-point__duration">${this.makeDuration(this._time[0], this._time[1])}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    <ul class="trip-point__offers">
      ${this.makeOffer(this._offers)}
    </ul>
    </article>`.trim();
  }

  makeOffer(offers) {
    let htmlBtnOffer = ``;
    for (let item of offers) {
      htmlBtnOffer += `<li><button class="trip-point__offer">${item[0]} + &euro;&nbsp;${item[1]}</button></li>`;
    }
    return htmlBtnOffer;
  }

  maketime(timeStart, timeEnd) {
    let timeIn = moment(timeStart).format(`hh:mm`);
    let timeOut = moment(timeEnd).format(`hh:mm`);
    return `${timeIn}&nbsp;&mdash; ${timeOut}`;
  }

  makeDuration(timeStart, timeEnd) {
    let timeIn = moment(timeStart).format(`hh:mm`).split(`:`);
    let timeOut = moment(timeEnd).format(`hh:mm`).split(`:`);
    let duration = getClearDuration(timeIn, timeOut);

    return `${duration.hours}h ${duration.minutes}m`;
  }

  bind() {
    this._element = createElement(this.template).firstElementChild;

    this._element.addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  get element() {
    return this._element;
  }

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
  }
}
