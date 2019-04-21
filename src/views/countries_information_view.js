const PubSub = require('../helpers/pub_sub.js');

class CountriesInfoView {

  constructor() {
    this.countryNameContainer = document.querySelector('#country-information-head');
    this.countryInfoContainer = document.querySelector('#country-information');
    this.adjacentCountryHead = document.querySelector('#adjacent-country-head')
    this.adjacentCountryContainer = document.querySelector('#adjacent-country')
  };

  bindEvents() {
    PubSub.subscribe('Chosen-Country-Information', (event) => {
      const countryInformation = event.detail;
      this.renderName(countryInformation);
      this.renderFlag(countryInformation)
      this.renderInformation(countryInformation);
    });

    PubSub.subscribe('Chosen-Country-Adjacent-List', (event) => {
      const adjacentCountryList = event.detail;
      this.renderAdjacent(adjacentCountryList);
    });
  }

  renderName(countryInformation){
    this.countryNameContainer.innerHTML = '';
    const countryName = document.createElement('h2');
    countryName.textContent = countryInformation.name;
    this.countryNameContainer.appendChild(countryName);
  }

  renderFlag(countryInformation){
    const flag = countryInformation.flag;
    this.countryInfoContainer.style.backgroundImage = "url('" + flag + "')";
  }

  renderInformation(countryInformation) {
    this.countryInfoContainer.innerHTML = '';
    this.populateStat(countryInformation,'capital');
    this.populateStat(countryInformation,'region');
    this.populateStat(countryInformation,'subregion');
    this.populateStat(countryInformation,'population');
  }

  populateStat(countryInformation, stat){
    const list = document.createElement('ul');
    list.textContent = `${stat}: ${countryInformation[stat]}`;
    list.classList.add('capital');
    this.countryInfoContainer.appendChild(list);
  };

  renderAdjacent(adjacentCountryList){
    this.adjacentCountryContainer.innerHTML = '';
    this.adjacentCountryHead.innerHTML = '';
    if (adjacentCountryList.length>0){
      const listHead = document.createElement('h4');
      listHead.textContent = (`It shares it's border with:`)

      this.adjacentCountryHead.appendChild(listHead);
      adjacentCountryList.forEach((country)=>{
        const tile = this.createTile(country);
        this.adjacentCountryContainer.appendChild(tile);
      });
    };
  }

  createTile(country){
    const tile = document.createElement('tile');
        tile.textContent = country.name
        tile.classList.add('flex-tile');
        const flag = country.flag;
        tile.style.backgroundImage = "url('" + flag + "')";

        tile.addEventListener('click', (event) => {
          PubSub.publish('Chosen-Country-Information', country);
        });
        return tile;
  };
}

module.exports = CountriesInfoView;
