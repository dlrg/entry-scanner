/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.app = options.app;
    this.Statistics = {
      async currentVisitors () {
        const entries = await this.app.service('entry').find();
        const populatedEntries = await Promise.all(entries.map(entry => {
          return this.app.service('station')
            .get(entry.stationId)
            .then(station => ({}.assign(entry, {station})));
        }));
        return populatedEntries.reduce((acc, entry) => acc += entry.station.direction, 0);
      }
    };
  }

  async find (params) {
    return Object.keys(this.Statistics);
  }

  async get (id, params) {
    return this.Statistics[id]();
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
