import icons from 'url:../../img/icons/icons.svg';
import View from './View';
import { HOST } from '../config.js';
import * as HELPERS from '../helpers.js';
// import { filter } from 'core-js/core/array';

class DealsView extends View {
  _parentElement = document.querySelector('.deals-section');
  _errorMessage = `Не найдено сделок, соответствующих параметрам запроса.`;

  // addHandlerRender(handler) {
  //   [`hashchange`, `load`].forEach(event =>
  //     window.addEventListener(event, handler)
  //   );
  // }

  addHandlerUpdate(handler) {
    const filtersContainer = document.querySelector(`.filters-container`);
    filtersContainer.addEventListener(`change`, function (e) {
      const filterField = e.target.closest(`.filter-field`);
      handler(e.target.id, filterField.value);
    });
  }

  _generateMarkup() {
    return `${this._data.deals.map(this._generateMarkupDeal).join(``)}`;
  }

  _generateMarkupDeal(deal) {
    return `
    <div class="deal-container box-container grid grid--2-cols">
      <div class="grid grid--1-2">
        <a href="#" class="btn flex btn--full" id="user-deal--stats">
          <div class="flex">
            <svg class="icon">
              <use href="${icons}#user"></use>
            </svg>
            <p class="text-content" id="manager-name">${HELPERS.capitalizeFirstLetter(
              deal.responsible.responsibleName
            )}</p>
          </div>
          <svg class="icon">
            <use href="${icons}#stats"></use>
          </svg>
        </a>
        <div class="box flex standard company-name">
          <p class="text-content">${HELPERS.toUpperCase(
            deal.company.companyName
          )}</p>
          <a href="${
            HOST + `Products/CRM/Default.aspx?id=` + deal.company.companyID
          }" target="_blank" class="btn flex btn--outline">
            <svg class="icon">
              <use href="${icons}#open"></use>
            </svg>
          </a>
        </div>
        <div class="box flex standard">
          <svg class="icon">
            <use href="${icons}#createDate"></use>
          </svg>
          <p class="text-content">${HELPERS.formatDate(
            deal.dates.created.createdDate
          )}</p>
        </div>
        <div class="box flex standard">
          <svg class="icon">
            <use href="${icons}#closeDate"></use>
          </svg>
          <p class="text-content">${HELPERS.formatDate(
            deal.dates.closed.closedDate
          )}</p>
        </div>
        <div class="box flex standard">
          <svg class="icon">
            <use href="${icons}#stage"></use>
          </svg>
          <p class="text-content">${HELPERS.capitalizeFirstLetter(
            deal.stage.name
          )}</p>
        </div>
      </div>
      <div class="grid grid--2-1">
        <div class="box flex standard deal-specification">
          <div class="specification-content">
            <p class="text-content">${HELPERS.toUpperCase(
              deal.deal.specification.vendor
            )}</p>
            <p class="text-content">${HELPERS.capitalizeFirstLetter(
              deal.deal.specification.product
            )} ${deal.deal.specification.licenseType}</p>
            <p class="text-content">${deal.deal.specification.quantity}</p>
          </div>
          <a href="${
            HOST + `Products/CRM/Deals.aspx?id=` + deal.deal.dealID
          }" target="_blank" class="btn flex btn--outline">
            <svg class="icon">
              <use href="${icons}#open"></use>
            </svg>
          </a>
        </div>
        <div class="box flex standard">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">${HELPERS.formatNumber(
            HELPERS.reduceToMillions(deal.revenue.pipe)
          )} млн</p>
        </div>
        <div class="box flex standard">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">${HELPERS.formatNumber(
            HELPERS.reduceToMillions(deal.income.pipe)
          )} млн</p>
        </div>
        <div class="box flex standard link">
          <div class="flex">
            <svg class="icon">
              <use href="${icons}#ticket"></use>
            </svg>
            <p class="text-content">${HELPERS.formatDate(
              deal.ticket.registration.expiresDate
            )}</p>
          </div>
          <a href="${
            deal.ticket.link
              ? deal.ticket.link
              : `${HOST + `Products/CRM/Deals.aspx?id=` + deal.deal.dealID}`
          }" target="_blank" class="btn flex btn--outline">
            <svg class="icon">
              <use href="${icons}#open"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
    `;
  }
}

export default new DealsView();
