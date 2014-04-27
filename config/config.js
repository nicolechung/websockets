module.exports = function() {
  var config = {};
  config.web = {};
  config.mongo = {};

  switch(process.env.NODE_ENV) {
    case 'local':
      config.mongo.uri = 'mongodb://localhost/< local database details >';
      config.mongo.host = 'localhost';
      config.web.port = process.env.PORT || 4711;
    break;

    default: /* heroku*/
      config.mongo.uri = 'mongodb://< heroku database details >';
      config.web.port = process.env.PORT || 5000;
    break;
  }
  return config;
}