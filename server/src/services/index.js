const entry = require('./entry/entry.service.js');
const station = require('./station/station.service.js');
const statistics = require('./statistics/statistics.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(entry);
  app.configure(station);
  app.configure(statistics);
};
