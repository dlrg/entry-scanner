/* eslint-disable no-unused-vars */
class Service {
  constructor ({app}) {
    this.events = ['patched'];

    this.Statistics = {
      async currentVisitors () {
        const entries = await app.service('entry').find();
        const populatedEntries = await Promise.all(entries.filter(entry => !!entry.stationId).map(entry => {
          return app.service('station')
            .get(entry.stationId)
            .then(station => (Object.assign(entry, {station})));
        }));
        const data = populatedEntries.reduce((acc, entry) => {
          acc += entry.station.direction;
          return acc;
        }, 0);
        return {
          _id: 'currentVisitors',
          data
        };
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
