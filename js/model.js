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
  stats: ``,
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
      // TODO: Refactor to universal methods to create properties
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
        actualClosedDate:
          HELPERS.checkContent(data.actualCloseDate) &&
          new Date(data.actualCloseDate).getTime(),
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
    this.dates.closed.actualClosedDate &&
      ((this.dates.closed.actualClosedMonth = HELPERS.getMonthfromDate(
        this.dates.closed.actualClosedDate
      )),
      (this.dates.closed.actualClosedYear = HELPERS.getYearfromDate(
        this.dates.closed.actualClosedDate
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

class Stats {
  stagesObj = {
    firstContact: `первичный контакт`,
    above: `над воронкой`,
    in: `в воронке`,
    bestNoDate: `лучшие без срока`,
    bestSeveral: `несколько лучших`,
    success: `закрытие/заключение сделки`,
    failure: `закрыта неудачно`,
  };
  yearsObj = {
    thisYear: new Date().getFullYear(),
    nextYear: new Date().getFullYear() + 1,
  };
  monthsObj = {
    month1: `январь`,
    month2: `февраль`,
    month3: `март`,
    month4: `апрель`,
    month5: `май`,
    month6: `июнь`,
    month7: `июль`,
    month8: `август`,
    month9: `сентябрь`,
    month10: `октябрь`,
    month11: `ноябрь`,
    month12: `декабрь`,
  };

  constructor(deals, managerName) {
    this.responsible = managerName ? managerName : CONFIG.USER_DATA.lastName;
    this.pipe = {
      total: {
        dealsArr: filterOutClosedDeals(deals),
        dealsArr_revenue_pipe: HELPERS.getSum(filterOutClosedDeals(deals), [
          `revenue`,
          `pipe`,
        ]),
        dealsArr_income_pipe: HELPERS.getSum(filterOutClosedDeals(deals), [
          `income`,
          `pipe`,
        ]),
      },
    };
    this.years = {};
    this.months = {};
    this.calculateProperties(deals);
  }

  calculateProperties(dealsArr) {
    this.calculateStages(`pipe`, dealsArr);
    this.calculateYears(`years`, dealsArr);
    this.calculateMonths(`months`, dealsArr);
    this.calculateQuarters();
  }

  calculateStages(parent, dealsArr) {
    const entries = Object.entries(this.stagesObj);
    for (const [stage, stageName] of entries) {
      this.createChildProp(parent, stage);
      this.filterByChildProps(
        parent,
        stage,
        `dealsArr`,
        dealsArr,
        [`stage`, `name`],
        stageName
      );
      // TODO: Fix naming convention!!!
      this.sumPropValues(parent, stage, `dealsArr`, [
        `revenue_pipe`,
        `income_pipe`,
      ]);
    }
  }

  calculateYears(parent, dealsArr) {
    const entries = Object.entries(this.yearsObj);
    for (const [year, value] of entries) {
      this.createChildProp(parent, year);
      this.filterByChildProps(
        parent,
        year,
        `dealsArr`,
        dealsArr,
        [`dates`, `closed`, `closedYear`],
        value,
        true
      );
      this.sumPropValues(parent, year, `dealsArr`, [
        `revenue_pipe`,
        `income_pipe`,
        `revenue_forecast`,
        `income_forecast`,
      ]);
    }
  }

  calculateMonths(parent, dealsArr) {
    const entries = Object.entries(this.monthsObj);
    for (const [key, value] of entries) {
      this.createChildProp(parent, key);
      this[parent][key][`name`] = value;
      this.filterByChildProps(
        parent,
        key,
        `dealsClosed`,
        dealsArr,
        [`dates`, `closed`, `actualClosedMonth`],
        `${value} ${this.yearsObj.thisYear}`
      );
      this.filterByChildProps(
        parent,
        key,
        `dealsNew`,
        dealsArr,
        [`dates`, `created`, `createdMonth`],
        `${value} ${this.yearsObj.thisYear}`
      );
      this.filterByChildProps(
        parent,
        key,
        `dealsActive`,
        dealsArr,
        [`dates`, `closed`, `closedMonth`],
        `${value} ${this.yearsObj.thisYear}`,
        true
      );
      this.filterByChildProps(
        parent,
        key,
        `dealsSuccess`,
        this[parent][key][`dealsClosed`],
        [`stage`, `name`],
        this.stagesObj.success
      );
      this.filterByChildProps(
        parent,
        key,
        `dealsFailure`,
        this[parent][key][`dealsClosed`],
        [`stage`, `name`],
        this.stagesObj.failure
      );
      this.sumPropValues(parent, key, `dealsActive`, [
        `revenue_pipe`,
        `income_pipe`,
        `revenue_forecast`,
        `income_forecast`,
      ]);
      this.sumPropValues(parent, key, `dealsNew`, [
        `revenue_pipe`,
        `income_pipe`,
      ]);
      this.sumPropValues(parent, key, `dealsSuccess`, [
        `revenue_pipe`,
        `income_pipe`,
      ]);
      this.sumPropValues(parent, key, `dealsFailure`, [
        `revenue_pipe`,
        `income_pipe`,
      ]);
    }
  }

  // TODO: refactor!!!
  calculateQuarters() {
    this.years.thisYear.Q1_revenue_forecast =
      this.months.month1.dealsActive_revenue_forecast +
      this.months.month2.dealsActive_revenue_forecast +
      this.months.month3.dealsActive_revenue_forecast;
    this.years.thisYear.Q1_income_forecast =
      this.months.month1.dealsActive_income_forecast +
      this.months.month2.dealsActive_income_forecast +
      this.months.month3.dealsActive_income_forecast;
    this.years.thisYear.Q2_revenue_forecast =
      this.months.month4.dealsActive_revenue_forecast +
      this.months.month5.dealsActive_revenue_forecast +
      this.months.month6.dealsActive_revenue_forecast;
    this.years.thisYear.Q2_income_forecast =
      this.months.month4.dealsActive_income_forecast +
      this.months.month5.dealsActive_income_forecast +
      this.months.month6.dealsActive_income_forecast;
    this.years.thisYear.Q3_revenue_forecast =
      this.months.month7.dealsActive_revenue_forecast +
      this.months.month8.dealsActive_revenue_forecast +
      this.months.month9.dealsActive_revenue_forecast;
    this.years.thisYear.Q3_income_forecast =
      this.months.month7.dealsActive_income_forecast +
      this.months.month8.dealsActive_income_forecast +
      this.months.month9.dealsActive_income_forecast;
    this.years.thisYear.Q4_revenue_forecast =
      this.months.month10.dealsActive_revenue_forecast +
      this.months.month11.dealsActive_revenue_forecast +
      this.months.month12.dealsActive_revenue_forecast;
    this.years.thisYear.Q4_income_forecast =
      this.months.month10.dealsActive_income_forecast +
      this.months.month11.dealsActive_income_forecast +
      this.months.month12.dealsActive_income_forecast;
  }

  // TODO: refactor to create any number of descendant properties
  createChildProp(parent, child) {
    this[parent][child] = {};
  }
  // TODO: try using this[getDescendantProperties]
  filterByChildProps(
    parent,
    child,
    prop,
    dealsArr,
    propArr,
    value,
    filterClosed = false
  ) {
    !filterClosed
      ? (this[parent][child][prop] = dealsArr.filter(
          deal => HELPERS.getDescendantProperty(deal, propArr) === value
        ))
      : (this[parent][child][prop] = filterOutClosedDeals(
          dealsArr.filter(
            deal => HELPERS.getDescendantProperty(deal, propArr) === value
          )
        ));
  }
  sumPropValues(parent, child, propName, propArr) {
    propArr.forEach(prop => {
      const propValue = HELPERS.getSum(
        HELPERS.getDescendantProperty(this, [parent, child, propName]),
        prop.split(`_`)
      );
      this[parent][child][`${propName}_${prop}`] = propValue;
    });
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
  state.deals = state.deals.filter(deal =>
    Object.entries(HELPERS.getDescendantProperty(deal, propertyArr))
      .flat(propertyArr.length)
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

export const getStats = function (managerName) {
  const deals = managerName
    ? initialState.deals.filter(
        deal => deal.responsible.responsibleName === managerName.toLowerCase()
      )
    : initialState.deals.slice();
  state.stats = new Stats(deals, managerName);
};
