/**
 * Created by rayde on 4/9/2016.
 */
var request = require('superagent');


module.exports = {
  fetchAudio: function(receiveHTML) {
      request
          .get('/audio?partial=true')
          .end(function(err, res){
              if(res.ok){
                  receiveHTML(res.text);
              }
              else {
                  alert('API call failed: ' + res.text);
              }
          });
  }
};