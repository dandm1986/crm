import { HOST } from './config.js';

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

export const checkContent = function (content) {
  return content ? content : ``;
};

export const checkCustomFields = function (data, fieldLabel) {
  return (
    data.customFields.find(el => el.label === fieldLabel)?.fieldValue || ``
  );
};

export const formatDate = function (date) {
  return new Intl.DateTimeFormat(navigator.language, {
    year: `numeric`,
    month: 'numeric',
    day: 'numeric',
  }).format(date);
};

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

export const formatNumber = function (number) {
  return new Intl.NumberFormat(navigator.language).format(number);
};

export const getUnique = function (arr, property) {
  const newArr = arr.map(el => eval(property));
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  return newArr.filter(onlyUnique);
};

export const filterBy = function (arr, property, value) {
  const newArr = arr.filter(el => eval(property) === value);
  return newArr;
};

export const getFirstWord = function (string) {
  return string.slice(0, string.indexOf(` `));
};

export const getNumberSymbolsFromString = function (string) {
  return string
    .toLowerCase()
    .slice(0, string.indexOf(`,`))
    .replace(/[ .а-я]/g, ``)
    .trim();
};

// // TODO: REFACTOR!!!
// export const getDateFromString = function (data) {
//   const arrNum = checkCustomFields(data, `Окончание регистрации`)
//     .split(`.`)
//     .map(el => +el);
//   return new Date(arrNum[2], arrNum[1] - 1, arrNum[0]);
// };
