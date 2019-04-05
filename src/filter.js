import {
  Component
} from "../src/component.js";

import {
  createElement
} from "../src/utils.js";

export class Filter extends Component {
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
    this._element.querySelector(this._id).addEventListener(`click`, this._onFilterButtonClick);
  }

  unbind() {
    this._element.querySelector(this._id).removeEventListener(`click`, this._onFilterButtonClick);
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
        return array.filter((it) => Date.now() < it.time[0]);
    }
    return array;
  }

  get template() {
    return /* html*/ `<input type="radio"
    id="filter-${this._name}"
    name="filter"
    value="${this._name}"
    ${this._check ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${this._name}">${this._name}</label>`;
  }
}

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 6;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;

const moneyChart = new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`✈️ FLY`, `🏨 STAY`, `🚗 DRIVE`, `🏛️ LOOK`, `🏨 EAT`, `🚕 RIDE`],
    datasets: [{
      data: [400, 300, 200, 160, 150, 100],
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => `€ ${val}`
      }
    },
    title: {
      display: true,
      text: `MONEY`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
});
