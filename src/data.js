import {
  random,
  getRandomArrayItem,
  getRandomArray
} from "../src/utils.js";

export const FILTERS_ARRAY = [{
  name: `everything`,
  check: true
},
{
  name: `future`
},
{
  name: `past`
}
];

const timeShift = () => {
  const hours = random(0, 24);
  const min = random(1, 60);
  const timeMs = (hours * 60 * 60 * 1000) + (min * 60 * 1000);

  return [hours, min, timeMs];
};

const TIME_OPTIONS = {
  hour: `numeric`,
  minute: `numeric`,
  hour12: false
};

export const DATA_POINTS = {
  POINTS_TYPE: {
    'Taxi': `🚕`,
    'Bus': `🚌`,
    'Train': `🚂`,
    'Ship': `🛳️`,
    'Transport': `🚊`,
    'Drive': `🚗`,
    'Flight': `✈️`,
    'Check-in': `🏨`,
    'Sightseeing': `🏛️`,
    'Restaurant': `🍴`,
  },
  CITIES: [`Moscow`, `Monterrey`, `Washington`, `Paris`, `London`, `Frankfurt`, `Florence`, `Rom`, `Velington`],
  OFFERS: [[`Add luggage`, random(5, 100)], [`Switch to comfort class`, random(5, 100)], [`Add meal`, random(5, 100)], [`Choose seats`, random(5, 100)]],
  DESCRIPTION_TEXT: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
};

const convertTime = (time, options, locale = `en-GB`) => new Date(time).toLocaleString(locale, options);

const getTimePoints = () => {
  const timePoint = Date.now();
  const duration = timeShift();
  const timeStart = convertTime(timePoint, TIME_OPTIONS);
  const timeEnd = convertTime(timePoint + duration[2], TIME_OPTIONS);
  return [timeStart, timeEnd, duration];
};

const getRandomTypePoint = () => {
  let [typeName, icon] = getRandomArrayItem(Object.entries(DATA_POINTS.POINTS_TYPE));
  return {
    typeName,
    icon
  };
};

const getRandomDescription = (text) => {
  let arrStr = text.split(`. `);
  let result = new Set();
  let size = random(0, 3);
  for (let item = 0; item <= size; item++) {
    result.add(arrStr[random(0, arrStr.length)]);
  }
  return [...result].join(` `);
};

export const makeRandomEvent = () => ({
  type: getRandomTypePoint(),
  time: getTimePoints(),
  city: DATA_POINTS.CITIES[random(0, DATA_POINTS.CITIES.length - 1)],
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  price: random(10, 40),
  offers: getRandomArray(DATA_POINTS.OFFERS, 2),
  description: getRandomDescription(DATA_POINTS.DESCRIPTION_TEXT)
});


// eventItem.js

const createElement = function (element) {
  const point = document.createElement(`template`);
  point.innerHTML = element;
  return point.content;
};

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

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  bind() {
    this._element.querySelector(`.trip-point`)
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

// eventItemEdit.js

export class eventItemEdit {
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

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    typeof this._onSubmit === `function` && this._onSubmit();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    `<article class="trip-point">
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

    return `<article class="point">
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

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" ${this._type.icon === `✈️` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
            </div>

            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${this._type.icon === `🏨` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing" ${this._type.icon === `🏛` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
            </div>
          </div>
        </div>

        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">Flight to</label>
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
          <input class="point__input" type="text" value="${this._time[0]} — ${this._time[1]}" name="time" placeholder="${this._time[0]} — ${this._time[1]}">
        </label>

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
      </section>$
    </form>
  </article>
  `.trim();
  }

  makeOffer(offers) {
    let htmlBtnOffer = ``;
    for (let item of offers) {
      const nameId = item[0].toLowerCase().replace(/ /g, `-`);
      htmlBtnOffer +=
      `<input class="point__offers-input visually-hidden" type="checkbox" id="${nameId}" name="offer" value="${nameId}">
      <label for="${nameId}" class="point__offers-label">
        <span class="point__offer-service">${item[0]}</span> + €<span class="point__offer-price">${item[1]}</span>
      </label>`;
    }
    return htmlBtnOffer;
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

  bind() {
    this._element.querySelector(`.point__button--save`)
        .addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    // Удаление обработчиков
  }

};
