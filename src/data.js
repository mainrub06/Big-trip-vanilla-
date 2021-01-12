import { random } from "../src/utils";

export const FILTERS_ARRAY = [
  {
    name: `everything`,
    check: true,
  },
  {
    name: `future`,
    check: false,
  },
  {
    name: `past`,
    check: false,
  },
];

export const DATA_POINTS = {
  POINTS_TYPE: {
    taxi: `🚕`,
    bus: `🚌`,
    train: `🚂`,
    ship: `🛳️`,
    transport: `🚊`,
    drive: `🚗`,
    flight: `✈️`,
    "check-in": `🏨`,
    sightseeing: `🏛️`,
    restaurant: `🍴`,
  },
  CITIES: [
    `Moscow`,
    `Monterrey`,
    `Washington`,
    `Paris`,
    `London`,
    `Frankfurt`,
    `Florence`,
    `Rom`,
    `Velington`,
  ],
  OFFERS: [
    {
      title: `Add luggage`,
      price: random(5, 100),
      accepted: true,
    },
    {
      title: `Switch to comfort class`,
      price: random(5, 100),
      accepted: true,
    },
    {
      title: `Add meal`,
      price: random(5, 100),
      accepted: true,
    },
    {
      title: `Choose seats`,
      price: random(5, 100),
      accepted: true,
    },
  ],
  DESCRIPTION_TEXT: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
};
