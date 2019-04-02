import {
  createElement
} from "../src/utils.js";

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._state = {};
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
