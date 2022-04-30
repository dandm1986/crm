// Support for old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as MODEL from './model.js';

const login = async function () {
  try {
    await MODEL.getToken();
    await MODEL.createState();
    console.log(MODEL.state.deals);
  } catch (error) {
    console.log(error);
  }
};

login();
