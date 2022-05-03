import * as CONFIG from './config.js';
import * as HELPERS from './helpers.js';

let toggle = 1;

export let state = {
  deals: [],
  summary: {
    dealsTotal: ``,
    revenueTotal: ``,
    incomeTotal: ``,
  },
  managers: [],
  stages: [],
  closedPeriod: [],
};

export let initialState = {};

class Deal {
  constructor(data) {
    this.responsible = data.responsible && {
      responsibleID: data.responsible.id,
      responsibleName: HELPERS.getFirstWord(
        data.responsible.displayName
      ).toLowerCase(),
      responsibleRole: HELPERS.checkContent(
        data.responsible.title
      ).toLowerCase(),
    };
    this.company = data.contact && {
      companyID: data.contact.id,
      companyName: HELPERS.checkContent(data.contact.displayName).toLowerCase(),
    };
    this.deal = {
      dealID: data.id,
      title: HELPERS.checkContent(data.title).toLowerCase(),
      specification: {
        vendor: HELPERS.checkCustomFields(data, `Вендор`).toLowerCase(),
        product: HELPERS.checkCustomFields(data, `Продукт`).toLowerCase(),
        licenseType: HELPERS.checkCustomFields(
          data,
          `Тип лицензии`
        ).toLowerCase(),
        quantity: HELPERS.checkCustomFields(data, `Количество`).toLowerCase(),
        paymentConditions: HELPERS.checkCustomFields(
          data,
          `Условия оплаты`
        ).toLowerCase(),
      },
    };
    this.stage = {
      name: data.stage.title.toLowerCase(),
      ratio: data.stage.successProbability / 100,
    };
    this.revenue = {
      pipe: HELPERS.checkContent(data.bidValue),
    };
    this.income = {
      pipe: +HELPERS.getNumberSymbolsFromString(
        HELPERS.checkCustomFields(data, `Валовый доход`)
      ),
    };
    this.dates = {
      created: {
        createdDate: new Date(data.created).getTime(),
      },
      closed: {
        closedDate:
          HELPERS.checkContent(data.expectedCloseDate) &&
          new Date(data.expectedCloseDate).getTime(),
      },
    };
    this.ticket = {
      registration: {
        expiresDate:
          HELPERS.checkCustomFields(data, `Окончание регистрации`) &&
          HELPERS.getDateFromString(data, `Окончание регистрации`),
      },
      link: HELPERS.checkCustomFields(data, `№ тикета`),
    };
    this.calculateProperties();
  }

  calculateProperties() {
    this.revenue.forecast = this.revenue.pipe * this.stage.ratio;
    this.income.forecast = this.income.pipe * this.stage.ratio;
    this.dates.created.createdMonth = HELPERS.getMonthfromDate(
      this.dates.created.createdDate
    );
    this.dates.created.createdYear = HELPERS.getYearfromDate(
      this.dates.created.createdDate
    );
    this.dates.closed.closedDate &&
      ((this.dates.closed.closedMonth = HELPERS.getMonthfromDate(
        this.dates.closed.closedDate
      )),
      (this.dates.closed.closedYear = HELPERS.getYearfromDate(
        this.dates.closed.closedDate
      )));
    this.ticket.registration.expiresDate &&
      ((this.ticket.registration.expiresMonth = HELPERS.getMonthfromDate(
        this.ticket.registration.expiresDate
      )),
      (this.ticket.registration.expiresYear = HELPERS.getYearfromDate(
        this.ticket.registration.expiresDate
      )));
  }
}

const getDealsData = async function () {
  try {
    const data = await HELPERS.getJSON(
      `api/2.0/crm/opportunity/filter`,
      `GET`,
      {
        Authorization: `Bearer ${CONFIG.USER_DATA.token}`,
      }
    );
    return data.response;
  } catch (error) {
    throw error;
  }
};

const createSummary = function () {
  state.summary.dealsTotal = state.deals.length;
  state.summary.revenueTotal = HELPERS.getSum(state.deals, [`revenue`, `pipe`]);
  state.summary.incomeTotal = HELPERS.getSum(state.deals, [`income`, `pipe`]);
};

const filterOutClosedDeals = function (arr) {
  return arr
    .filter(el => el.stage.name !== `закрыта неудачно`)
    .filter(el => el.stage.name !== `закрытие/заключение сделки`);
};

const prepareFilterData = function () {
  clearOutFilterData();
  prepareManagers();
  prepareStages();
  prepareCloseDates();
};

const clearOutFilterData = function () {
  state.managers.length = state.stages.length = state.closedPeriod.length = 0;
};
const prepareManagers = function () {
  HELPERS.getUnique(state.deals, [`responsible`, `responsibleName`]).forEach(
    el => {
      state.managers.push(el);
    }
  );
};
const prepareStages = function () {
  HELPERS.getUnique(state.deals, [`stage`, `name`]).forEach(el => {
    state.stages.push(el);
  });
};
const prepareCloseDates = function () {
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const dealsThisYear = filterOutClosedDeals(
    state.deals.filter(el => el.dates.closed.closedYear === thisYear)
  );
  const dealsNextYear = filterOutClosedDeals(
    state.deals.filter(el => el.dates.closed.closedYear === thisYear + 1)
  );
  const closedPeriod = [];
  const monthsThisYear = HELPERS.getUnique(dealsThisYear, [
    `dates`,
    `closed`,
    `closedMonth`,
  ]).map(el => HELPERS.getFirstWord(el));
  const months = {
    январь: 0,
    февраль: 1,
    март: 2,
    апрель: 3,
    май: 4,
    июнь: 5,
    июль: 6,
    август: 7,
    сентябрь: 8,
    октябрь: 9,
    ноябрь: 10,
    декабрь: 11,
  };
  monthsThisYear.sort((m1, m2) => {
    let n1 = months[m1],
      n2 = months[m2];
    if (n1 < thisMonth) {
      n1 = n1 + 12;
    }
    if (n2 < thisMonth) {
      n2 = n2 + 12;
    }
    return n1 - n2;
  });
  monthsThisYear.forEach(el => closedPeriod.push(el + ` ${thisYear}`));
  dealsNextYear.length > 0 && closedPeriod.push(`${thisYear + 1}`);
  closedPeriod.forEach(el => state.closedPeriod.push(el));
};

export const getToken = async function (loginData) {
  try {
    const data = await HELPERS.sendJSON(
      `api/2.0/authentication`,
      `POST`,
      {
        'Content-Type': 'application/json',
      },
      loginData
    );
    const token = data.response?.token || ``;
    localStorage.setItem(`R7 API token`, token);
    CONFIG.USER_DATA.token = localStorage.getItem(`R7 API token`);
    console.log(CONFIG.USER_DATA.token);
  } catch (error) {
    throw error;
  }
};

export const checkLoggedIn = function () {
  CONFIG.USER_DATA.token = localStorage.getItem(`R7 API token`);
  return CONFIG.USER_DATA.token ? true : false;
};

export const deleteToken = function () {
  localStorage.removeItem(`R7 API token`);
};

export const getUserData = async function () {
  try {
    const data = await HELPERS.getJSON(`api/2.0/people/@self`, `GET`, {
      Authorization: `Bearer ${CONFIG.USER_DATA.token}`,
    });
    CONFIG.USER_DATA.userID = data.response.id;
    CONFIG.USER_DATA.isAdmin = data.response.isAdmin;
    CONFIG.USER_DATA.firstName = data.response.firstName;
    CONFIG.USER_DATA.lastName = data.response.lastName;
  } catch (error) {
    throw error;
  }
};

export const createState = async function () {
  try {
    state.deals.length = 0;
    const dealsData = await getDealsData();
    CONFIG.USER_DATA.isAdmin
      ? dealsData.forEach(el => state.deals.push(new Deal(el)))
      : dealsData
          .filter(el => el.responsible.id === CONFIG.USER_DATA.userID)
          .forEach(el => state.deals.push(new Deal(el)));
    createSummary();
    prepareFilterData();
    initialState = HELPERS.objDeepCopy(state);
  } catch (error) {
    throw error;
  }
};

export const updateState = function (propertyArr, value) {
  const arrFlatDepth = propertyArr.length > 1 ? propertyArr - 1 : 1;
  state.deals = state.deals.filter(deal =>
    Object.entries(HELPERS.getDescendantProperty(deal, propertyArr))
      .flat(arrFlatDepth)
      .map(el => el + ``)
      .some(el => el.includes(value.toLowerCase()))
  );
  createSummary();
  prepareFilterData();
};

export const sortState = function (arr) {
  state.deals.sort(
    (a, b) =>
      -(HELPERS.getDescendantProperty(a, arr) * toggle) +
      HELPERS.getDescendantProperty(b, arr) * toggle
  );
  toggle = toggle * -1;
};

export const resetState = function () {
  state = HELPERS.objDeepCopy(initialState);
  toggle = 1;
};
