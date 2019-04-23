import {
  Component
} from "../src/component.js";
import {
  createElement
} from "../src/utils.js";

export class Price extends Component {
  constructor(data) {
    super();
    this._points = data;

    this._element = null;
  }

  countTotalPrice(array) {
    let price = 0;
    array.forEach(element => {
      price += +element.price;
    });
    return price;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  get template() {
    return /* html*/ `<p class="trip__total">
      Total:
      <span class="trip__total-cost">&euro;&nbsp;${this.countTotalPrice(this._points)}</span>
      </p>`;
  }
}
