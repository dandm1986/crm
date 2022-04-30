import icons from 'url:../../img/icons/icons.svg';
import View from './View';
import * as HELPERS from '../helpers.js';

class SummaryView extends View {
  _parentElement = document.querySelector('.summary-section');
  _errorMessage = ``;

  _generateMarkup() {
    return `
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
    `;
  }
}

export default new SummaryView();
