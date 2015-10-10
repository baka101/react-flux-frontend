var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var appUtils;

module.exports = {

  //////////////////////////////////
  // USER TRIGGERED ACTIONS
  //////////////////////////////////
  getUrlInfo: function (url) {
    var appUtils = require('../utils/app-utils');
    appUtils.getUrlInfo(url);
  },

  removeCampaign: function (id) {
    AppDispatcher.dispatch({
      type: AppConstants.REMOVE_CAMPAIGN,
      data: id
    });
  },

  //////////////////////////////////
  // PROGRAM TRIGGERED ACTIONS
  //////////////////////////////////
  receiveUrlInfo: function (data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_URL_INFO,
      data: data
    });
  },

  startLoading: function () {
    AppDispatcher.dispatch({
      type: AppConstants.START_LOADING
    });
  },

  stopLoading: function () {
    AppDispatcher.dispatch({
      type: AppConstants.STOP_LOADING
    });
  }

}