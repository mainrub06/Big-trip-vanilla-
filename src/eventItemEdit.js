import {
  Component
} from "../src/component.js";
import flatpickr from "flatpickr";
import moment from "moment";
import {
  DATA_POINTS
} from "../src/data.js";

export class EventItemEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._city = data.city;
    this._time = data.time;
    this._picture = data.picture;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;

    this._onChangeType = this._onChangeType.bind(this);
    this._onChangeTimeStart = this._onChangeTimeStart.bind(this);
    this._onChangeTimeEnd = this._onChangeTimeEnd.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteBtnClick = this._onDeleteBtnClick.bind(this);

    this._element = null;
    this._onSubmit = null;
    this._onDelete = null;
  }

  _onChangePrice(e) {
    this._price = e.target.value;
  }

  _onChangeTimeStart() {
    const valueInput = this._element.querySelector(`.point__time-start`).value;
    this._time[0] = new Date(moment(valueInput, `h:mm`));
  }

  _onChangeTimeEnd() {
    const valueInput = this._element.querySelector(`.point__time-end`).value;
    this._time[1] = new Date(moment(valueInput, `h:mm`));
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onDeleteBtnClick(e) {
    if (typeof this._onDelete === `function`) {
      e.preventDefault();
      this._onDelete();
    }
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  bind() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.travel-way__select`).addEventListener(`change`, this._onChangeType);
    this._element.querySelector(`button[type="reset"]`).addEventListener(`click`, this._onDeleteBtnClick);
    this._element.querySelector(`.point__offers-wrap`).addEventListener(`click`, this._isCheckedOffer);

    flatpickr(this._element.querySelector(`.point__time input[name="time-start"]`), {
      enableTime: true,
      altInput: true,
      noCalendar: true,
      defaultDate: [this._time[0]],
      altFormat: `h:i K`,
      dateFormat: `h:i K`,
      onClose: this._onChangeTimeStart,
    });

    flatpickr(this._element.querySelector(`.point__time input[name="time-end"]`), {
      enableTime: true,
      altInput: true,
      noCalendar: true,
      defaultDate: [this._time[1]],
      altFormat: `h:i K`,
      dateFormat: `h:i K`,
      onClose: this._onChangeTimeEnd,
    });
  }

  unbind() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.travel-way__select-group`).removeEventListener(`click`, this._onChangeType);
    this._element.querySelector(`button[type="reset"]`).removeEventListener(`click`, this._onDeleteBtnClick);
    this._element.querySelector(`.point__offers-wrap`).removeEventListener(`click`, this._isCheckedOffer);

    flatpickr(this._element.querySelector(`.point__time input[name="time-start"]`)).destroy();
    flatpickr(this._element.querySelector(`.point__time input[name="time-end"]`)).destroy();
  }

  _onChangeType(e) {
    if (e.target.tagName.toLowerCase() === `input`) {
      let value = e.target.value;
      this._type = {
        typeName: value,
        icon: DATA_POINTS.POINTS_TYPE[value]
      };
      this._partialUpdate();
    }
  }

  _partialUpdate() {
    this.unbind();
    const oldElem = this._element;
    this._element.parentNode.replaceChild(this.render(), oldElem);
    oldElem.remove();
    this.bind();
  }

  static createMapper(target) {
    return {
      offer(index) {
        target.offers[index].accepted = true;
      },
      destination(value) {
        target.city = value;
      },
      price(value) {
        target.price = value;
      },
      [`travel-way`](value) {
        target.type = {
          icon: DATA_POINTS.POINTS_TYPE[value],
          typeName: value,
        };
      },
      [`time-start`](value) {
        target.time[0] = new Date(moment(value, `h:mm`));
      },
      [`time-end`](value) {
        target.time[1] = new Date(moment(value, `h:mm`));
      },
    };
  }

  _processForm(formData) {
    const offersArray = this._offers.map((offer) => {
      return {
        title: offer.title,
        price: offer.price,
        accepted: false
      };
    });

    const entry = {
      type: this._type,
      offers: offersArray,
      time: [],
      price: null,
      city: ``,
      totalPrice: 0,
    };

    const pointMapper = EventItemEdit.createMapper.call(this, entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointMapper[property]) {
        pointMapper[property](value);
      }
    }
    return entry;
  }

  update(data) {
    this._type = data.type;
    this._city = data.city;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;
  }

  makeOffer(offers) {
    return offers.map((offer, i) => {
      const nameId = offer.title.toLowerCase().replace(/ /g, `-`);
      return `<input class="point__offers-input visually-hidden" type="checkbox" id="${nameId}-${i}" name="offer" value="${i}" ${offer.accepted ? `checked` : ``}>
      <label for="${nameId}-${i}" class="point__offers-label">
        <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>`;
    }).join(``);
  }

  get template() {
    return /* html*/ `<article class="point">
    <form action="" method="get">
      <header class="point__header">
        <label class="point__date">
          choose day
          <input class="point__input" type="text" placeholder="MAR 18" name="day">
        </label>

        <div class="travel-way">
          <label class="travel-way__label" for="travel-way__toggle">${this._type.icon}</label>

          <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

          <div class="travel-way__select">
            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${this._type.icon === `🚕` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus" ${this._type.icon === `🚌` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${this._type.icon === `🚂` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${this._type.icon === `✈️` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
            </div>

            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${this._type.icon === `🏨` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sightseeing" ${this._type.icon === `🏛` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
            </div>
          </div>
        </div>

        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">${this._type.typeName} to</label>
          <input class="point__destination-input" list="destination-select" id="destination" value="${this._city}" name="destination">
          <datalist id="destination-select">
            <option value="airport"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="hotel"></option>
          </datalist>
        </div>

        <label class="point__time">
          choose time
          <input class="point__input point__time-start" type="text" value="${this._time[0]}" name="time-start" placeholder="${this._time[0]}">
          <input class="point__input point__time-end" type="text" value="${this._time[1]}" name="time-end" placeholder="${this._time[1]}">        </label>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${this._price}" name="price">
        </label>

        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button" type="reset">Delete</button>
        </div>

        <div class="paint__favorite-wrap">
          <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
          <label class="point__favorite" for="favorite">favorite</label>
        </div>
      </header>

      <section class="point__details">
        <section class="point__offers">
          <h3 class="point__details-title">offers</h3>

          <div class="point__offers-wrap">
            ${this.makeOffer(this._offers)}
          </div>

        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${this._description}</p>
          <div class="point__destination-images">
            <img src="${this._picture}" alt="picture from place" class="point__destination-image">
            <img src="${this._picture}" alt="picture from place" class="point__destination-image">
            <img src="${this._picture}" alt="picture from place" class="point__destination-image">
            <img src="${this._picture}" alt="picture from place" class="point__destination-image">
            <img src="${this._picture}" alt="picture from place" class="point__destination-image">
          </div>
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  </article>
  `.trim();
  }
}
