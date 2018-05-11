// Initializes the `entry` service on path `/entry`
const createService = require('feathers-nedb');
const createModel = require('../../models/entry.model');
const hooks = require('./entry.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    name: 'entry',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/entry', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('entry');

  service.hooks(hooks);
};
