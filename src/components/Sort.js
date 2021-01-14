import { Component } from "../core/Component";

class Sort extends Component {
  constructor() {
    super();

    this._handleChangeSorting = this._handleChangeSorting.bind(this);
  }

  renderSorting() {}

  unrenderSorting() {}

  _handleChangeSorting(evt) {
    evt.preventDefault();
    console.log(evt.target);
  }

  bind() {
    this.renderSorting();
    this._element
      .querySelector(".trip-sorting")
      .addEventListener("change", this._handleChangeSorting);
  }

  unbind() {
    this.unrenderSorting();
    this._element
      .querySelector(".trip-sorting")
      .removeEventListener("change", this._handleChangeSorting);
  }

  get template() {
    return `<form class="trip-sorting">
    <input type="radio" name="trip-sorting" id="sorting-event" value="event">
    <label class="trip-sorting__item trip-sorting__item--event" for="sorting-event">Event</label>

    <input type="radio" name="trip-sorting" id="sorting-time" value="time">
    <label class="trip-sorting__item trip-sorting__item--time" for="sorting-time" checked>Time</label>

    <input type="radio" name="trip-sorting" id="sorting-price" value="price">
    <label class="trip-sorting__item trip-sorting__item--price" for="sorting-price">Price</label>

    <span class="trip-sorting__item trip-sorting__item--offers">Offers</span>
  </form>`.trim();
  }
}

export default Sort;
