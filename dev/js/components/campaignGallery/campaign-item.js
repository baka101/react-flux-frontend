var React = require("react");
var classNames = require("classnames");
var AppActions = require("../../actions/app-actions");
var appUtils = require('../../utils/app-utils');

var CampaignItem = React.createClass({

  getInitialState: function(){
    var obj = {
      hover: false,
      imgLoaded: false,
      profileLoaded: false
    };
    return obj;
  },

  _onImageLoaded: function() {
    if (this.isMounted()) {
      this.setState({imgLoaded: true});
      this._checkLoading();
    }
  },

  _onProfileLoaded: function () {
    if (this.isMounted()) {
      this.setState({profileLoaded: true});
      this._checkLoading();
    }
  },

  _checkLoading: function () {
    if (this.state.imgLoaded && this.state.profileLoaded) {
      AppActions.stopLoading();
    }
  },

  componentDidMount: function() {
    var img = new window.Image();
    img.onload = this._onImageLoaded;
    img.src = this.props.data.img;

    var profileImg = new window.Image();
    profileImg.onload = this._onProfileLoaded;
    profileImg.src = this.props.data.admin.img;
  },

  _onClick: function () {
    AppActions.removeCampaign(this.props.data.id);
  },

  _onHover: function () {
    this.setState({hover: true});
  },

  _onMouseOff: function () {
    this.setState({hover: false});
  },

  render: function(){
    //render with this.props.data 
    var campaign = this.props.data;

    var authorStyle = {
      backgroundImage: 'url(' + campaign.admin.img + ')',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    };

    var imageStyle = {
      backgroundImage: 'url(' + campaign.img + ')',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    };

    if (this.state.imgLoaded && this.state.profileLoaded) {
      return (
        <div className="campaign-box">
          <div onMouseOver={this._onHover} onMouseLeave={this._onMouseOff}>
            {this.state.hover ? <div onClick={this._onClick} className="campaign-close"><img src="dist/assets/close-icon.png" /></div> : null}
            <div className="campaign-img" style={imageStyle}></div>
          </div> 
          <p className="campaign-title"> {campaign.title} </p>
          <div className="campaign-info">
            <div className="author-img" style={authorStyle}></div>
            <div className="campaign-text">
              <p className="author-name">{campaign.admin.firstname} {campaign.admin.lastname}</p>
              <p className="funds"><span className="fund-amount">{appUtils.stringifyAmount(campaign.raised_amount)}</span> raised</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

});

module.exports = CampaignItem;