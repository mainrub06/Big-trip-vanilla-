import { Component } from "../core/Component";
import { createElement } from "../utils/utils";

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._check = data.check;
    this._id = `#filter-` + this._name;

    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);

    this._element = null;
    this._onFilter = null;
  }

  get element() {
    return this._element;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterButtonClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  bind() {
    this._element
      .querySelector(this._id)
      .addEventListener(`click`, this._onFilterButtonClick);
  }

  unbind() {
    this._element
      .querySelector(this._id)
      .removeEventListener(`click`, this._onFilterButtonClick);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  getFilteredArray(array) {
    switch (this._name) {
      case `future`:
        return array.filter((it) => Date.now() < it.time[0]);
      case `past`:
        return array.filter((it) => Date.now() > it.time[0]);
    }
    return array;
  }

  get template() {
    return `<input type="radio"
    id="filter-${this._name}"
    name="filter"
    value="${this._name}"
    ${this._check ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${this._name}">${
      this._name
    }</label>`;
  }
}

export default Filter;
