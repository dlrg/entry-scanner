// Initializes the `statistics` service on path `/statistics`
const createService = require('./statistics.class.js');
const hooks = require('./statistics.hooks');

module.exports = function (app) {

  const options = {
    name: 'statistics',
    app
  };

  // Initialize our service with any options it requires
  app.use('/statistics', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('statistics');

  service.hooks(hooks);
  app.service('entry').on('created', () => {
    service.get('currentVisitors').then(data => {
      service.emit('patched', data);
    });
  });
};
