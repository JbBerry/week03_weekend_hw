const PubSub = require('../helpers/pub_sub.js');

class CountriesInfoView {

  constructor() {
    this.countryInfoContainer = document.querySelector('#country-information');
    this.adjacentCountryHead = document.querySelector('#adjacent-country-head')
    this.adjacentCountryContainer = document.querySelector('#adjacent-country')
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
    const flag = countryInformation.flag;
    this.countryInfoContainer.style.backgroundImage = "url('" + flag + "')";
  }

  renderInformation(countryInformation) {
    this.countryInfoContainer.innerHTML = '';
    this.countryInfoContainer.style.height = '400px';
    if(countryInformation.name != countryInformation.nativeName){
      this.populateStat(countryInformation,'nativeName');
    };
    this.populateStat(countryInformation,'capital');
    this.populateStat(countryInformation,'region');
    this.populateStat(countryInformation,'subregion');
    this.populateStat(countryInformation,'population');
  }

  populateStat(countryInformation, stat){
    if (countryInformation[stat].length>0 && countryInformation[stat]!= "") {
      const list = document.createElement('ul');
      list.textContent = `${stat}: ${countryInformation[stat]}`;
      list.classList.add('capital');
      this.countryInfoContainer.appendChild(list);
    }
  };

  renderAdjacent(adjacentCountryList){
    this.adjacentCountryContainer.innerHTML = '';
    this.adjacentCountryHead.innerHTML = '';
    if (adjacentCountryList.length>0){
      this.adjacentCountryHead.innerHTML = '';
      this.adjacentCountryHead.style.height = '50px';
      this.adjacentCountryHead.textContent = (`It shares it's border with`);
      adjacentCountryList.forEach((country)=>{
        const tile = this.createTile(country);
        this.adjacentCountryContainer.appendChild(tile);
      });
    }else{
      this.adjacentCountryHead.innerHTML = '';
      this.adjacentCountryHead.style.height = '0px';
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
