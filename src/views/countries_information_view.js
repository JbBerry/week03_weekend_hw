const PubSub = require('../helpers/pub_sub.js');

class CountriesInfoView {

  bindEvents() {
    PubSub.subscribe('Chosen-Country-Information', (event) => {
      const countryInformation = event.detail;
      this.render (countryInformation);
    });
  }
}

module.exports = CountriesInfoView;
