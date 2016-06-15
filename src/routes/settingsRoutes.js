var express = require('express');

var settingsRouter = express.Router();


var router = function() {
  var settingsController = require('../controllers/settingsController.js')();

  // View Settings Route
  settingsRouter.route('/')
    .get(settingsController.getIndex);

  // Edit Settings Route
  settingsRouter.route('/edit')
    .get(settingsController.getSettingsEdit);

  settingsRouter.route('/update')
    .post(settingsController.postSettingsUpdate);

  settingsRouter.route('/create')
    .get(settingsController.getSettingsCreate);
    //.post(settingsController.postSettingsCreate);

  return settingsRouter;
};

module.exports = router;
