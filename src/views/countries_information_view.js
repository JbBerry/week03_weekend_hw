const PubSub = require('../helpers/pub_sub.js');

class CountriesInfoView {

  constructor() {
    this.container = document.querySelector('#country-information');
  };

  bindEvents() {
    PubSub.subscribe('Chosen-Country-Information', (event) => {
      const countryInformation = event.detail;
      this.renderInformation (countryInformation);
      this.renderLinks(countryInformation);
    });
  }

  renderInformation(countryInformation) {
    this.container.innerHTML = '';
    const countryName = document.createElement('h2')
    const description = document.createElement('p')
    const flag = countryInformation.flag;

    countryName.textContent = countryInformation.name;
    description.textContent = (`${countryInformation.name} has a capital of ${countryInformation.capital}`);
    this.container.style.backgroundImage = "url('" + flag + "')";

    this.container.appendChild(countryName);
    this.container.appendChild(description);
    });
  }

  renderLinks(countryInformation){
    countryInformation.borders.forEach((border) => {
      console.log('a country');
      const adjCountry = document.createElement('p')
      adjCountry.textContent = border;
      console.log(border);
      this.container.appendChild(adjCountry);
    });
  };
}
module.exports = CountriesInfoView;
