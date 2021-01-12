import { Component } from "../src/component";
import { createElement } from "../src/utils";

export class Price extends Component {
  constructor(price) {
    super();
    this._price = price;

    this._element = null;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  get template() {
    return /* html*/ `<p class="trip__total">
      Total:
      <span class="trip__total-cost">&euro;&nbsp;${this._price}</span>
      </p>`;
  }
}
