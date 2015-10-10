var React = require("react");
var classNames = require("classnames");
var AppActions = require("../../actions/app-actions");
var CampaignStore = require('../../stores/app-campaignStore');
var appUtils = require('../../utils/app-utils');

function _validateUrl (url) {
  var urlRegex = /^(https?):\/\/?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  if (url.match(urlRegex) && (url.indexOf('tilt.com') !== -1)){
    return true;
  } else {
    return false;
  }
}

var UrlInput = React.createClass({

  _onSubmit: function (e) {
    e.preventDefault();
    var url = React.findDOMNode(this.refs.text).value;

    if (_validateUrl(url)){
      AppActions.startLoading();
      AppActions.getUrlInfo(url);
      React.findDOMNode(this.refs.text).value = '';
    } else {
      alert('Please enter a valid tilt.com campaign url.  E.g. https://www.tilt.com/campaigns/save-the-toy-store');
    }

  },

  _onClick: function () {
    var amount = 0;
    var campaigns = CampaignStore.getAllCampaigns();

    for (var i=0; i<campaigns.length; i++) {
      amount += campaigns[i].raised_amount;
    }

    alert('Total raised amount of all campaigns on page: ' + appUtils.stringifyAmount(amount));
  },

  render: function(){ 
    return (
      <div className="input-section">
        <form className="url-form" onSubmit={this._onSubmit}>
          <input className="url-input" ref="text" type="text" placeholder="campaign url" required/>
          <button className="input-button" type="submit">submit</button>
        </form>
        <button className="input-button" onClick={this._onClick}>show total</button>
      </div>
    );
  }

});

module.exports = UrlInput;