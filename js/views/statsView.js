import icons from 'url:../../img/icons/icons.svg';
import View from './View';
import * as HELPERS from '../helpers.js';

class StatsView extends View {
  _parentElement = document.querySelector('.container--main-view');
  _errorMessage = ``;

  _generateMarkup() {
    return `
    <div class="stats-container">
        <div class="grid grid--2-1 stats">
        <div class="grid grid--2-cols stats-overview">
          <div class="grid grid--2-1 stats-overview--funnel box-container">
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#user"></use>
                </svg>
                <p class="text-content">
                  ${this._data.responsible}
                </p>
              </div>
              <p class="text-content">${
                this._data.pipe.total.dealsArr.length
              }</p>
            </div>
            <div class="box header summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.total.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.total.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">Первичный контакт</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.firstContact.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  
                >
                ${HELPERS.reduceToMillions(
                  this._data.pipe.firstContact.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.firstContact.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">Над воронкой</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.above.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.above.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.above.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">В воронке</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.in.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.in.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.in.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">Лучшие без срока</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.bestNoDate.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.bestNoDate.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.bestNoDate.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">Несколько лучших</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.bestSeveral.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.bestSeveral.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.bestSeveral.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">Закрыто успешно</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.success.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.success.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.success.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
            <div class="box flex header include-data">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#stage"></use>
                </svg>
                <p class="text-content">Закрыто неуспешно</p>
              </div>
              <p class="text-content">
              ${this._data.pipe.failure.dealsArr.length}
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.failure.dealsArr_revenue_pipe
                )} млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content">
                ${HELPERS.reduceToMillions(
                  this._data.pipe.failure.dealsArr_income_pipe
                )} млн
                </p>
              </div>
            </div>
          </div>
          <div class="stats-overview--pipe-forecast">
            <div
              class="grid grid--3-cols pipe-forecast--current-year box-container"
            >
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#period"></use>
                  </svg>
                  <p class="text-content">${this._data.yearsObj.thisYear}</p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">Выручка</p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">ВД</p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#stage"></use>
                  </svg>
                  <p class="text-content">Воронка</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.dealsArr_revenue_pipe
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.dealsArr_income_pipe
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Прогноз</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.dealsArr_revenue_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.dealsArr_income_forecast
                  )} млн
                  </p>
                </div>
              </div>
            </div>
            <div
              class="grid grid--3-cols pipe-forecast--current-year-quarterly box-container"
            >
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q1 ${this._data.yearsObj.thisYear}</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q1-revenue"
                  >
                    ${HELPERS.reduceToMillions(
                      this._data.years.thisYear.Q1_revenue_forecast
                    )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q1-income"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q1_income_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q2 ${this._data.yearsObj.thisYear}</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q2-revenue"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q2_revenue_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q2-income"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q2_income_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q3 ${this._data.yearsObj.thisYear}</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q3-revenue"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q3_revenue_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q3-income"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q3_income_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q4 ${this._data.yearsObj.thisYear}</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q4-revenue"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q4_revenue_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year-quarterly--forecast-Q4-income"
                  >
                  ${HELPERS.reduceToMillions(
                    this._data.years.thisYear.Q4_income_forecast
                  )} млн
                  </p>
                </div>
              </div>
            </div>
            <div
              class="grid grid--3-cols pipe-forecast--next-year box-container"
            >
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#period"></use>
                  </svg>
                  <p class="text-content">${this._data.yearsObj.nextYear}</p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">Выручка</p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">ВД</p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#stage"></use>
                  </svg>
                  <p class="text-content">Воронка</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.nextYear.dealsArr_revenue_pipe
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.nextYear.dealsArr_income_pipe
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Прогноз</p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.nextYear.dealsArr_revenue_forecast
                  )} млн
                  </p>
                </div>
              </div>
              <div class="box standard flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#money"></use>
                  </svg>
                  <p class="text-content">
                  ${HELPERS.reduceToMillions(
                    this._data.years.nextYear.dealsArr_income_forecast
                  )} млн
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stats-monthly">
        ${[...new Map(Object.entries(this._data.months))]
          .map(this._generateMarkupMonth)
          .join(``)}
        </div>
      </div>
      </div>
      
    `;
  }

  _generateMarkupMonth(month) {
    return `
    <div class="grid grid--3-cols month box-container">
      <div class="box header flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#period"></use>
          </svg>
          <p class="text-content">${HELPERS.capitalizeFirstLetter(
            month[1].name
          )}</p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#scale"></use>
          </svg>
          <p class="text-content">
            ${HELPERS.reduceToMillions(
              month[1].dealsActive_revenue_forecast
            )} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#scale"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsActive_income_forecast)} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#success"></use>
          </svg>
          <p class="text-content">
          ${month[1].dealsSuccess.length}
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsSuccess_revenue_pipe)} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsSuccess_income_pipe)} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#failure"></use>
          </svg>
          <p class="text-content">
          ${month[1].dealsFailure.length}
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsFailure_revenue_pipe)} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsFailure_income_pipe)} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#deal"></use>
          </svg>
          <p class="text-content">
          ${month[1].dealsNew.length}
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsNew_revenue_pipe)} млн
          </p>
        </div>
      </div>
      <div class="box standard flex">
        <div class="flex">
          <svg class="icon">
            <use href="${icons}#money"></use>
          </svg>
          <p class="text-content">
          ${HELPERS.reduceToMillions(month[1].dealsNew_income_pipe)} млн
          </p>
        </div>
      </div>
    </div>
    `;
  }
}

export default new StatsView();
