import { Component } from "../core/Component";

class Sort extends Component {
  constructor() {
    super();

    this._handleChangeSorting = this._handleChangeSorting.bind(this);
    this._onChange = null;

    this.checkedValue = "time";
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _handleChangeSorting(evt) {
    evt.preventDefault();
    this.checkedValue = evt.target.value;

    if (this._onChange) {
      this._onChange(evt.target.value);
    }
  }

  bind() {
    this._element.addEventListener("change", this._handleChangeSorting);
  }

  unbind() {
    this._element.removeEventListener("change", this._handleChangeSorting);
  }

  get template() {
    return `<form class="trip-sorting">
    <input type="radio" name="trip-sorting" id="sorting-event" value="event">
    <label class="trip-sorting__item trip-sorting__item--event" for="sorting-event">Event</label>

    <input type="radio" name="trip-sorting" id="sorting-time" value="time" checked>
    <label class="trip-sorting__item trip-sorting__item--time" for="sorting-time">Time</label>

    <input type="radio" name="trip-sorting" id="sorting-price" value="price">
    <label class="trip-sorting__item trip-sorting__item--price" for="sorting-price">Price</label>

    <span class="trip-sorting__item trip-sorting__item--offers">Offers</span>
  </form>`.trim();
  }
}

export default Sort;
