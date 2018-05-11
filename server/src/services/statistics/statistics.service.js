// Initializes the `statistics` service on path `/statistics`
const createService = require('./statistics.class.js');
const hooks = require('./statistics.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'statistics',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/statistics', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('statistics');

  service.hooks(hooks);
};
