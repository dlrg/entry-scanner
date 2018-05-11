const app = require('./app');
app.service('station').create({
  name: 'Eingang',
  direction: 1
});
app.service('station').create({
  name: 'Ausgang',
  direction: -1
});
