const PubSub = require('../helpers/pub_sub.js');

class CountriesInfoView {

  constructor() {
    this.container = document.querySelector('#country-information');
  };

  bindEvents() {
    PubSub.subscribe('Chosen-Country-Information', (event) => {
      const countryInformation = event.detail;
      this.renderFlag(countryInformation)
      this.renderInformation(countryInformation);
    });

    PubSub.subscribe('Chosen-Country-Adjacent-List', (event) => {
      const adjacentCountryList = event.detail;
      this.renderAdjacent(adjacentCountryList);
    });
  }

  renderFlag(countryInformation){
    this.container.innerHTML = '';
    const flag = countryInformation.flag;
    this.container.style.backgroundImage = "url('" + flag + "')";
  }

  renderInformation(countryInformation) {
    const countryName = document.createElement('h2');
    const description = document.createElement('p');
    countryName.textContent = countryInformation.name;
    description.textContent = (`${countryInformation.name}'s capital is ${countryInformation.capital}`);
    this.container.appendChild(countryName);
    this.container.appendChild(description);
  }

  renderAdjacent(adjacentCountryList){
    if (adjacentCountryList.length>0){
      const listHead = document.createElement('h3');
      listHead.textContent = (`It shares it's border with:`)
      this.container.appendChild(listHead);
      adjacentCountryList.forEach((country)=>{
        const list = document.createElement('ul');
        list.textContent = country;
        this.container.appendChild(list);
      });
    };
  }
}
module.exports = CountriesInfoView;
