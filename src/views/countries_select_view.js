const PubSub = require('../helpers/pub_sub.js');

class CountriesSelectView {

  constructor() {
    this.element = document.querySelector('#country-name');
  };

  bindEvents() {
    PubSub.subscribe('All-Countries', (event) => {
      const allCountries = event.detail;
      this.populateCountries(allCountries);
      this.chooseCountry();
      });
    };

  populateCountries(array) {
      array.forEach((country,index) => {
        const option = document.createElement('option');
        option.textContent = country;
        option.value = index;
        this.element.appendChild(option);
      });
    };

  chooseCountry(){
    this.element.addEventListener('change', (event) => {
    const country = event.target.value;
    PubSub.publish('Chosen-Country', country);
    });
  }
}

module.exports = CountriesSelectView;
