// Support for old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as MODEL from './model.js';

import dealsView from './views/dealsView.js';
import summaryView from './views/summaryView.js';

const login = async function () {
  try {
    dealsView.renderSpinner();
    await MODEL.getToken();
    await MODEL.createState();
    dealsView.render(MODEL.state);
    summaryView.render(MODEL.state);
  } catch (error) {
    console.log(error);
  }
};

login();

// const init = function () {
//   dealsView.addHandlerRender(login);
// };
// init();
