import View from './View';
import * as HELPERS from '../helpers.js';

class FilterStagesView extends View {
  _parentElement = document.querySelector('#filter--stage-name');
  _errorMessage = ``;

  _generateMarkup() {
    return `<option value="">Выберите этап...</option>
    ${this._data.stages.map(this._generateMarkupStages).join(``)}`;
  }

  _generateMarkupStages(stage) {
    return `
    <option value="${stage}">${HELPERS.capitalizeFirstLetter(stage)}</option>
    `;
  }
}

export default new FilterStagesView();
