import View from './View';
import * as HELPERS from '../helpers.js';

class FilterMonthsView extends View {
  _parentElement = document.querySelector('#filter--dates-closed-closedMonth');
  _errorMessage = ``;

  _generateMarkup() {
    return `<option value="">Выберите месяц...</option>
    ${this._data.closeMonth.map(this._generateMarkupMonths).join(``)}`;
  }

  _generateMarkupMonths(month) {
    return `
    <option value="${month}">${month}</option>
    `;
  }
}

export default new FilterMonthsView();
