const PubSub = require('./pub_sub.js');

class RequestHelper {
  constructor(url){
    this.url = url;
  }

  get(){
    return fetch(this.url)
      .then(response => response.json())
  }

}
module.exports = RequestHelper
