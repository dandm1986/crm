import { HOST } from './config.js';

//////////////// AJAX //////////////////

export const getJSON = async function (url, method, headers) {
  try {
    const response = await fetch(HOST + url, {
      method: method,
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, method, headers, body) {
  try {
    const response = await fetch(HOST + url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//////////////// VERIFY //////////////////

export const checkContent = function (content) {
  return content ? content : ``;
};

export const checkCustomFields = function (data, fieldLabel) {
  return (
    data.customFields.find(el => el.label === fieldLabel)?.fieldValue || ``
  );
};

//////////////// FORMAT DATA //////////////////

export const getMonthfromDate = function (timestamp) {
  return new Intl.DateTimeFormat(navigator.language, {
    month: `long`,
  })
    .format(timestamp)
    .toLowerCase();
};

export const getYearfromDate = function (timestamp) {
  return +new Intl.DateTimeFormat(navigator.language, {
    year: `numeric`,
  }).format(timestamp);
};

export const getFirstWord = function (string) {
  return string.slice(0, string.indexOf(` `));
};

export const getNumberSymbolsFromString = function (string) {
  return string.replace(/[ .а-я]/g, ``).trim();
};

export const getDateFromString = function (data, fieldLabel) {
  const arrNum = checkCustomFields(data, fieldLabel)
    .split(`.`)
    .map(el => +el);
  return new Date(arrNum[2], arrNum[1] - 1, arrNum[0]).getTime();
};

//////////////// FORMAT VIEW //////////////////

export const formatDate = function (timestamp) {
  const date = new Intl.DateTimeFormat(navigator.language, {
    year: `numeric`,
    month: 'numeric',
    day: 'numeric',
  }).format(timestamp);
  return date != `01.01.1970` ? date : ``;
};

export const formatNumber = function (number) {
  return new Intl.NumberFormat(navigator.language).format(number);
};

export const reduceToMillions = function (number) {
  return (number / 1000000).toFixed(2);
};

export const toUpperCase = function (string) {
  return string && string.toUpperCase();
};

export const capitalizeFirstLetter = function (string) {
  return string && string[0].toUpperCase() + string.slice(1);
};

//////////////// CALCULATE & FILTER //////////////////

export const getSum = function (arr, property) {
  return arr.reduce((acc, el) => acc + +eval(property), 0);
};

export const getUnique = function (arr, property) {
  const newArr = arr.map(el => eval(property));
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  return newArr.filter(onlyUnique);
};

export const getDescendantProperty = function (obj, desc) {
  const arr = desc.split('.');
  while (arr.length) {
    obj = obj[arr.shift()];
  }
  return obj;
};
