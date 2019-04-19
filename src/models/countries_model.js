const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

class CountriesModel {

  constructor() {
    this.data = [];
  };

  getData() {
    const url = `https://restcountries.eu/rest/v2/all`;
    const requestHelper = new RequestHelper(url);
    requestHelper.get()
      .then((data)=>{
        this.data = data;
        PubSub.publish('Countries:data-loaded', data)
        this.getCountriesList()
      })
      .catch(message =>{
        console.error(message);
      })
  };

  getCountriesList() {
    const countryList = this.data.map(function(country){
      return country.name
    });
    PubSub.publish('All-Countries', countryList);
  };

  getCountryInformation(){
    PubSub.subscribe('Chosen-Country', (event) => {
    const countryIndex = event.detail;
    const countryInformation = this.data[countryIndex];
    PubSub.publish('Chosen-Country-Information', countryInformation);
    });
  };

  getAdjacentCountryNames(){
    PubSub.subscribe('Chosen-Country-Information', (event) => {
      const chosenCountryInfo = event.detail;
      const adjacentCountryList = [];
      chosenCountryInfo.borders.forEach((border)=>{
        this.data.forEach((country,index)=>{
          if (this.data[index].cioc === border){
            adjacentCountryList.push(this.data[index].name);
          }
        });
      });
      //console.log(countryList);
      PubSub.publish('Chosen-Country-Adjacent-List', adjacentCountryList);
    });
  };

}

module.exports = CountriesModel;

// "name": "Afghanistan",
// "alpha3Code": "AFG",
// "capital": "Kabul",
// "region": "Asia",
// "subregion": "Southern Asia",
// "population": 27657145,
// "latlng": [33,65],
// "demonym": "Afghan",
// "area": 652230,
// "gini": 27.8,
// "timezones": ["UTC+04:30"],
// "borders": ["IRN","PAK","TKM","UZB","TJK","CHN"],
// "nativeName": "افغانستان",
// "numericCode": "004",
// "currencies": [
// {
// "code": "AFN",
// "name": "Afghan afghani",
// "symbol": "؋"
// }
// ],
// "languages": [
//  {"iso639_1": "ps",
//   "iso639_2": "pus",
//   "name": "Pashto",
//   "nativeName": "پښتو" },
//  ],
// "flag": "https://restcountries.eu/data/afg.svg",
// "regionalBlocs": [
//  { "acronym": "SAARC",
//    "name": "South Asian Association for Regional Cooperation",
//    "otherAcronyms": [],
//    "otherNames": []
//  }],
// "cioc": "AFG"
// },
