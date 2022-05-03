import icons from 'url:../../img/icons/icons.svg';
import View from './View';
import { HOST } from '../config.js';
import * as HELPERS from '../helpers.js';

class DealsView extends View {
  _parentElement = document.querySelector('.container--main-view');
  _errorMessage = `Не найдено сделок, соответствующих параметрам запроса.`;

  addHandlerReset(handler) {
    window.addEventListener(`keydown`, function (e) {
      e.key === 'Escape' && handler();
    });
    const reloadBtn = document.querySelector(`#user-menu--reload`);
    reloadBtn.addEventListener(`click`, handler);
  }

  addHandlerUpdate(handler) {
    const filtersContainer = document.querySelector(`.filters-container`);
    filtersContainer.addEventListener(`change`, function (e) {
      const filterField = e.target.closest(`.filter-field`);
      const propertyArr = filterField.id.split(`--`)[1].split(`-`);
      handler(propertyArr, filterField.value);
    });
  }

  addHandlerSort(handler) {
    const sortContainer = document.querySelector(`.sort-container`);
    sortContainer.addEventListener(`click`, function (e) {
      const sortBtn = e.target.closest(`.btn--sort`);
      const propertyArr = sortBtn.id.split(`--`)[1].split(`-`);
      handler(propertyArr);
    });
  }

  _generateMarkup() {
    return `
    <div class="grid grid--1-2 container--deals-view">
      <div class="filters-section">
        <div class="user-container box-container">
          <div class="box filter summary-section flex">
            <div class="summary-item flex">
              <svg class="icon">
                <use href="${icons}#deal"></use>
              </svg>
              <p class="text-content" id="total-deals">${
                this._data.summary.dealsTotal
              }</p>
            </div>
            <div class="summary-item flex">
              <svg class="icon">
                <use href="${icons}#money"></use>
              </svg>
              <p class="text-content" id="sum-revenue">${HELPERS.formatNumber(
                HELPERS.reduceToMillions(this._data.summary.revenueTotal)
              )} млн</p>
            </div>
            <div class="summary-item flex">
              <svg class="icon">
                <use href="${icons}#money"></use>
              </svg>
              <p class="text-content" id="sum-income">${HELPERS.formatNumber(
                HELPERS.reduceToMillions(this._data.summary.incomeTotal)
              )} млн</p>
            </div>
          </div> 
        </div>
        <div class="filters-container box-container grid grid--3-cols">
          <div class="filter-label flex">
            <div class="flex">
              <svg class="icon">
                <use href="${icons}#user"></use>
              </svg>
              <p class="text-content">Менеджер</p>
            </div>
          </div>
          <div class="box filter search-container">
            <select class="filter-field" id="filter--responsible">
              <option value="">Выберите менеджера...</option>
              ${this._data.managers.map(this._generateMarkupManagers).join(``)}
            </select>
          </div>
          <div class="filter-label flex">
            <div class="flex">
              <svg class="icon">
                <use href="${icons}#company"></use>
              </svg>
              <p class="text-content">Компания</p>
            </div>
          </div>
          <div class="box filter search-container">
            <input
              class="filter-field"
              id="filter--company"
              type="text"
              placeholder="Поиск"
            />
          </div>
          <div class="filter-label flex"">
            <div class="flex">
              <svg class="icon">
                <use href="${icons}#deal"></use>
              </svg>
              <p class="text-content">Сделка</p>
            </div>
          </div>
          <div class="box filter search-container">
            <input
            class="filter-field"
              id="filter--deal-specification"
              type="text"
              placeholder="Поиск"
            />
          </div>
          <div class="filter-label flex">
            <div class="flex">
              <svg class="icon">
                <use href="${icons}#stage"></use>
              </svg>
              <p class="text-content">Этап</p>
            </div>
          </div>
          <div class="box filter search-container">
            <select class="filter-field" id="filter--stage">
              <option value="">Выберите этап...</option>
              ${this._data.stages.map(this._generateMarkupStages).join(``)}
            </select>
          </div>
          <div class="filter-label flex">
            <div class="flex">
              <svg class="icon">
                <use href="${icons}#closeDate"></use>
              </svg>
              <p class="text-content">Закрытие</p>
            </div>
          </div>
          <div class="box filter search-container">
            <select class="filter-field" id="filter--dates-closed">
              <option value="">Выберите месяц...</option>
              ${this._data.closedPeriod
                .map(this._generateMarkupClosedDate)
                .join(``)}
            </select>
          </div>
          <div class="grid grid--3-cols sort-container">
            <a href="#" class="btn flex btn--full btn--sort" id="sort--revenue-pipe">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">Выручка</p>
              </div>
              <svg class="icon">
                <use href="${icons}#sort"></use>
              </svg>
            </a>
            <a href="#" class="btn flex btn--full btn--sort" id="sort--income-pipe">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">ВД</p>
              </div>
              <svg class="icon">
                <use href="${icons}#sort"></use>
              </svg>
            </a>
            <a href="#" class="btn flex btn--full" id="user-menu--reload">
            <svg class="icon">
              <use href="${icons}#refresh"></use>
            </svg>
          </a>
            <a
              href="#"
              class="btn flex btn--full btn--sort"
              id="sort--ticket-registration-expiresDate"
            >
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#ticket"></use>
                </svg>
                <p class="text-content">Тикет</p>
              </div>
              <svg class="icon">
                <use href="${icons}#sort"></use>
              </svg>
            </a>
            <a href="#" class="btn flex btn--full btn--sort"  id="sort--dates-created-createdDate">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#createDate"></use>
                </svg>
                <p class="text-content">Дата</p>
              </div>
              <svg class="icon">
                <use href="${icons}#sort"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="deals-section">
        ${this._data.deals.map(this._generateMarkupDeal).join(``)}
      </div>    
    </div>    
    `;
  }
  _generateMarkupManagers(manager) {
    return `
    <option value="${manager}">${HELPERS.capitalizeFirstLetter(
      manager
    )}</option>
    `;
  }
  _generateMarkupStages(stage) {
    return `
    <option value="${stage}">${HELPERS.capitalizeFirstLetter(stage)}</option>
    `;
  }
  _generateMarkupClosedDate(month) {
    return `
    <option value="${month}">${month}</option>
    `;
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
