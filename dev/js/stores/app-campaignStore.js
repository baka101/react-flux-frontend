var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

var _campaigns = [];
var _loading = false;


var _checkValidData = function(data) {
  var result = true;

  //check that data has expected structure
  if (data.campaign === undefined) {
    result = false;
  } else if (data.campaign.admin === undefined) {
    result = false;
  }

  return result;
}

var _receiveCampaignInfo = function (data) {
  if (_checkValidData(data)) {
    data.campaign.id = _campaigns.length;
    _campaigns.push(data.campaign);
  } else {
    alert('ERROR: invalid campaign data');
  }
};

var _removeCampaign = function (id) {
  //remove campaign
  for (var i=0; i<_campaigns.length; i++) {
    if (_campaigns[i].id === id) {
      _campaigns.splice(i, 1);
      break;
    }
  }

  //reset campaign ids
  for (var i=0; i<_campaigns.length; i++) {
    _campaigns[i].id = i;
  }

};

var CampaignStore = assign({},EventEmitter.prototype, {

  getAllCampaigns: function() {
    return _campaigns;
  },

  getLoading: function() {
    return _loading;
  },

  /////////////////////////////////////////////////
  // DATA STORE FUNCTIONS
  /////////////////////////////////////////////////
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }  

});



CampaignStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.RECEIVE_URL_INFO:
      _receiveCampaignInfo(action.data);
      CampaignStore.emitChange();
      break;

    case AppConstants.REMOVE_CAMPAIGN:
      _removeCampaign(action.data);
      CampaignStore.emitChange();
      break;

    case AppConstants.START_LOADING:
      _loading = true;
      CampaignStore.emitChange();
      break;

    case AppConstants.STOP_LOADING:
      _loading = false;
      CampaignStore.emitChange();
      break;

    default:
  }
});


module.exports = CampaignStore;
