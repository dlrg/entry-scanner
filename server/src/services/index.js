const entry = require('./entry/entry.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(entry);
};
