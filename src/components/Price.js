import { Component } from "../core/Component";
import { createElement } from "../utils/utils";

class Price extends Component {
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

export default Price;
