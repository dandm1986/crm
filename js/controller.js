// Support for old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as MODEL from './model.js';

import dealsView from './views/dealsView.js';
import filterManagersView from './views/filterManagersView.js';
import filterStagesView from './views/filterStagesView.js';
import filterMonthsView from './views/filterMonthsView.js';
import summaryView from './views/summaryView.js';

const renderViews = function (data) {
  dealsView.render(data);
  summaryView.render(data);
  filterManagersView.render(data);
  filterStagesView.render(data);
  filterMonthsView.render(data);
};

const filterDeals = function (id, value) {
  [method, propertyRoute] = id.split(`--`);
  const property = propertyRoute.replaceAll(`-`, `.`);
  MODEL.updateState(method, property, value);
  renderViews(MODEL.state);
};

const login = async function () {
  try {
    dealsView.renderSpinner();
    await MODEL.getToken();
    await MODEL.createState();
    renderViews(MODEL.state);
  } catch (error) {
    console.log(error);
  }
};

login();

const init = function () {
  dealsView.addHandlerUpdate(filterDeals);
};
init();
