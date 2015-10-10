var AppActions = require('../actions/app-actions');


module.exports = {
  
  getUrlInfo: function(url) {
    $.ajax({
      url: url + '/stats.json',
      type: 'GET',
      timeout: 3000,
      dataType: 'jsonp',
    })
      .done(function(data) {
        AppActions.receiveUrlInfo(data);
      })
      .fail(function() {
        alert('ERROR: cannot retrieve campaign url.\nPlease enter a valid tilt.com campaign url. ' + 
          'E.g. https://www.tilt.com/campaigns/save-the-toy-store');
        AppActions.stopLoading();
      });
  }, 


  stringifyAmount: function (num) {
    var str = Math.round(num/100, 0).toString();
    var result = '';

    for (var i=1; i<=str.length; i++) {
      result = str[str.length-i] + result;
      if ((i!== str.length) && (i%3 === 0)) {
        result = ',' + result;
      }
    }

    return '$'+result;
  }

}