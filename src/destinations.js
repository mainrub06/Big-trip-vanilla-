export default class Dest {
  constructor(data) {
    this.name = data[`name`] || ``;
    this.description = data[`description`] || ``;
    this.pictures = data[`pictures`] || [];
  }

  static parseDestination(data) {
    return new Dest(data);
  }

  static parseDestinations(data) {
    return data.map((it) => {
      return {
        name: it.name,
        description: it.description,
        picture: it.pictures
      }
    });
  }
};
