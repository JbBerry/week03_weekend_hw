const CountriesInfoView = require('./views/countries_information_view.js');
const CountriesSelectView = require('./views/countries_select_view.js');
const CountriesModel = require('./models/countries_model.js');

document.addEventListener('DOMContentLoaded', () => {
  const countriesInfoView = new CountriesInfoView();
  countriesInfoView.bindEvents();

  const countriesSelectView = new CountriesSelectView();
  countriesSelectView.bindEvents();

  const countriesModel = new CountriesModel();
  countriesModel.getData();
  countriesModel.getCountryInformation();
  countriesModel.getAdjacentCountryNames();
});
