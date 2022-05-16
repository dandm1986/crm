// Support for old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as MODEL from './model.js';

import dealsView from './views/dealsView.js';
import loginView from './views/loginView.js';
import headerView from './views/headerView.js';
import statsView from './views/statsView.js';

const addHandlersDeals = function () {
  dealsView.addHandlerUpdate(filterDeals);
  dealsView.addHandlerSort(sortDeals);
  dealsView.addHandlerReset(resetDeals);
  dealsView.addHandlerStats(loadStats);
  headerView.addHandlerLogout(logout);
};
const addHandlersHeader = function () {
  headerView.addHandlerLogout(logout);
  headerView.addHandlerHome(resetDeals);
  headerView.addHandlerDownload(loadDeals);
  headerView.addHandlerStats(loadStats);
};

const login = async function (loginData) {
  try {
    await MODEL.getToken(loginData);
    await loadDeals();
  } catch (error) {
    throw error;
  }
};

const logout = function () {
  MODEL.deleteToken();
  init();
};

const loadDeals = async function () {
  try {
    dealsView.renderSpinner();
    await MODEL.getUserData();
    await MODEL.createState();
    headerView.render(MODEL.state);
    dealsView.render(MODEL.state);
    addHandlersHeader();
    addHandlersDeals();
  } catch (error) {
    throw error;
  }
};

const loadStats = function (manager) {
  MODEL.getStats(manager);
  statsView.render(MODEL.state.stats);
};

const filterDeals = function (propertyArr, value) {
  MODEL.updateState(propertyArr, value);
  dealsView.render(MODEL.state);
  addHandlersDeals();
};

const sortDeals = function (propertyArr) {
  MODEL.sortState(propertyArr);
  dealsView.render(MODEL.state);
  addHandlersDeals();
};

const resetDeals = function () {
  MODEL.resetState();
  dealsView.render(MODEL.state);
  addHandlersDeals();
};

const init = async function () {
  try {
    if (MODEL.checkLoggedIn()) {
      await loadDeals();
    } else {
      loginView.render(MODEL.state);
      loginView.addHandlerLogin(login);
    }
  } catch (error) {
    console.log(error);
  }
};

init();
