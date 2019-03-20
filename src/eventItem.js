import {createElement} from "../src/utils.js";

export class eventItem {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._time = data.time;
    this._picture = data.picture;
    this._price = data.price;
    this._offers =  data.offers ;
    this._description = data.description;

    this._element = null;
    this._state = {
      // Состояние компонента
    };
    this._onEdit = null;
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="trip-point">
    <i class="trip-icon">${this._type.icon}</i>
    <h3 class="trip-point__title">${this._type.typeName} to ${this._city}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${this._time[0]}&nbsp;&mdash; ${this._time[1]}</span>
      <span class="trip-point__duration">${this._time[2][0]}h ${this._time[2][1]}m</span>
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



  bind() {
    this._element.querySelector(`.trip-icon`)
        .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    // Удаление обработчиков
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

};
