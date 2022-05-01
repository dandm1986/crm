import View from './View';
import * as HELPERS from '../helpers.js';

class FilterManagersView extends View {
  _parentElement = document.querySelector(
    '#filter--responsible-responsibleName'
  );
  _errorMessage = ``;

  _generateMarkup() {
    return `<option value="">Выберите менеджера...</option>
    ${this._data.managers.map(this._generateMarkupManagers).join(``)}`;
  }

  _generateMarkupManagers(manager) {
    return `
    <option value="${manager}">${HELPERS.capitalizeFirstLetter(
      manager
    )}</option>
    `;
  }
}

export default new FilterManagersView();
