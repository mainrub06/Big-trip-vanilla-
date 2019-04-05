import {
  createElement
} from "../src/utils.js";

export class Filter {
  constructor() {
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  bind() {}

  unbind() {}

  render() {
    this._element = createElement(this.template).firstElementChild;
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}
