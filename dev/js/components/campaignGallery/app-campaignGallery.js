var React = require("react");
var classNames = require("classnames");
var CampaignItem = require('./campaign-item');
var CampaignStore = require('../../stores/app-campaignStore');


var getData = function(){
  return {
    campaigns: CampaignStore.getAllCampaigns(),
    loading: CampaignStore.getLoading()
  };
};

var CampaignGallery = React.createClass({
  getInitialState: function(){
    var obj = getData();
    return obj;
  },

  _onChange: function () {
    this.setState(getData());
  },

  componentDidMount: function() {
    CampaignStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CampaignStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var campaigns = [];
    var campaignsList = this.state.campaigns;

    // create the list of item for render
    for (var i=0; i < campaignsList.length; i++) {
      campaigns.push(<CampaignItem key={i} data={campaignsList[i]} />);
    };
   
    return (
      <div className="campaigns">
        {campaigns}
        {this.state.loading ? <div className="loading-box"><img className="loading-img" src="dist/assets/loading.gif" /></div> : null}
      </div>
    );
  }
});

module.exports = CampaignGallery;