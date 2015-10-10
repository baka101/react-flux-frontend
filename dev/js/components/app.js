var React = require('react');
var UrlInput = require('./urlInput/app-urlInput');
var CampaignGallery = require('./campaignGallery/app-campaignGallery');

var App = React.createClass({
  render: function(){
    return (
      <div className="container-fluid">
        <UrlInput />
        <CampaignGallery />
      </div>
    );
  }
});

module.exports = function(){
  React.render(<App />, document.getElementById('main'));
};