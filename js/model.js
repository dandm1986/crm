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
        vendor: ``,
        product: ``,
        licensePeriod: ``,
        quantity: ``,
        paymentConditions: ``,
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
          HELPERS.getDateFromString(data).getTime(),
      },
      link: HELPERS.checkCustomFields(data, `№ тикета`),
    };
    this.#calculateProperties();
  }

  #calculateProperties() {
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

export const state = {
  deals: [],
  managers: [],
  stages: [],
  closeMonth: [],
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

export const createState = async function () {
  try {
    const dealsData = await getDealsData();
    dealsData.forEach(el => state.deals.push(new Deal(el)));
  } catch (error) {
    throw error;
  }
};
