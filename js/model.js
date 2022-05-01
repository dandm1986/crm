import { async } from 'regenerator-runtime';

import * as CONFIG from './config.js';
import * as HELPERS from './helpers.js';

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

export const state = {
  deals: [],
  summary: {
    dealsTotal: ``,
    revenueTotal: ``,
    incomeTotal: ``,
  },
  managers: [],
  stages: [],
  closeMonth: [],
};

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
  state.summary.revenueTotal = HELPERS.getSum(state.deals, `el.revenue.pipe`);
  state.summary.incomeTotal = HELPERS.getSum(state.deals, `el.income.pipe`);
};

const prepareFilterData = function () {
  clearOutFilterData();
  prepareManagers();
  prepareStages();
  prepareCloseDates();
};

const clearOutFilterData = function () {
  state.managers.length = state.stages.length = state.closeMonth.length = 0;
};

const prepareManagers = function () {
  HELPERS.getUnique(state.deals, `el.responsible.responsibleName`).forEach(
    el => {
      state.managers.push(el);
    }
  );
};

const prepareStages = function () {
  HELPERS.getUnique(state.deals, `el.stage.name`).forEach(el => {
    state.stages.push(el);
  });
};

// TODO: Refactor to match current and next year
const prepareCloseDates = function () {
  const arr2022 = filterOutClosedDeals(
    state.deals.filter(el => el.dates.closed.closedYear === 2022)
  );
  const arr2023 = filterOutClosedDeals(
    state.deals.filter(el => el.dates.closed.closedYear === 2023)
  );
  const closeMonths = [];
  const months2022 = HELPERS.getUnique(arr2022, `el.dates.closed.closedMonth`);
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
  const currentMonth = new Date().getMonth();
  months2022.sort(function (m1, m2) {
    let n1 = months[m1],
      n2 = months[m2];
    if (n1 < currentMonth) {
      n1 = n1 + 12;
    }
    if (n2 < currentMonth) {
      n2 = n2 + 12;
    }
    return n1 - n2;
  });
  months2022.forEach(el => closeMonths.push(el));
  arr2023.length > 0 && closeMonths.push(`2023`);
  closeMonths.forEach(el => state.closeMonth.push(el));
};

const filterOutClosedDeals = function (arr) {
  return arr
    .filter(el => el.stage.name !== `закрыта неудачно`)
    .filter(el => el.stage.name !== `закрытие/заключение сделки`);
};

export const getToken = async function (userData) {
  try {
    // TODO: save token locally and send request for token only if the date expired
    const data = await HELPERS.sendJSON(
      `api/2.0/authentication`,
      `POST`,
      {
        'Content-Type': 'application/json',
      },
      CONFIG.USER_DATA.userData
    );
    CONFIG.USER_DATA.token = data.response?.token || ``;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async function () {
  try {
    const data = await HELPERS.getJSON(`api/2.0/people/@self`, `GET`, {
      Authorization: `Bearer ${CONFIG.USER_DATA.token}`,
    });
    return data.response;
  } catch (error) {
    throw error;
  }
};

export const createState = async function () {
  try {
    const dealsData = await getDealsData();
    dealsData.forEach(el => state.deals.push(new Deal(el)));
    createSummary();
    prepareFilterData();
  } catch (error) {
    throw error;
  }
};

export const updateState = function (method, prop, value) {
  if (method === `filter`) {
    state.deals = state.deals.filter(
      deal => HELPERS.getDescendantProperty(deal, prop) === value.toLowerCase()
    );
  } else if (method === `search`) {
    state.deals = state.deals.filter(deal =>
      Object.entries(HELPERS.getDescendantProperty(deal, prop))
        .flat() //TODO: find a universal way for any number of nested arrays
        .map(el => el + ``)
        .some(el => el.includes(value))
    );
  }
  createSummary();
  prepareFilterData();
};
