import icons from 'url:../../img/icons/icons.svg';
import View from './View';

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
                <p class="text-content" id="stats-overview--user-name">
                  Дмитренко Даниил
                </p>
              </div>
              <p class="text-content" id="stats-overview--deals-total">96</p>
            </div>
            <div class="box header summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content" id="stats-overview--sum-revenue">
                  435,35 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content" id="stats-overview--sum-income">
                  120,42 млн
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
              <p
                class="text-content"
                id="stats-overview--deals-total--first-contact"
              >
                6
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--first-contact"
                >
                  18,35 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-income--first-contact"
                >
                  7,26 млн
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
              <p
                class="text-content"
                id="stats-overview--deals-total--above-funnel"
              >
                23
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--above-funnel"
                >
                  125,35 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-income--above-funnel"
                >
                  37,26 млн
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
              <p
                class="text-content"
                id="stats-overview--deals-total--in-funnel"
              >
                51
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--in-funnel"
                >
                  290,35 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-income--in-funnel"
                >
                  10,26 млн
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
              <p
                class="text-content"
                id="stats-overview--deals-total--best-no-date"
              >
                1
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--best-no-date"
                >
                  0 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-income--best-no-date"
                >
                  0 млн
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
              <p class="text-content" id="stats-overview--deals-total--best">
                1
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--best"
                >
                  1 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p class="text-content" id="stats-overview--sum-income--best">
                  0,11 млн
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
              <p
                class="text-content"
                id="stats-overview--deals-total--closed-success"
              >
                4
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--closed-success"
                >
                  2,72 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-income--closed-success"
                >
                  1,12 млн
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
              <p
                class="text-content"
                id="stats-overview--deals-total--closed-failure"
              >
                10
              </p>
            </div>
            <div class="box standard summary">
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-revenue--closed-failure"
                >
                  24,35 млн
                </p>
              </div>
              <div class="summary-item flex">
                <svg class="icon">
                  <use href="${icons}#money"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-overview--sum-income--closed-failure"
                >
                  8,26 млн
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
                  <p class="text-content">2022</p>
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
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year--pipe-revenue"
                  >
                    345,12 млн
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
                    id="pipe-forecast--current-year--pipe-income"
                  >
                    97,54 млн
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
                  <p
                    class="text-content"
                    id="pipe-forecast--current-year--forecast-revenue"
                  >
                    106,24 млн
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
                    id="pipe-forecast--current-year--forecast-income"
                  >
                    27,79 млн
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
                  <p class="text-content">Q1 2022</p>
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
                    91,12 млн
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
                    23,24 млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q2 2022</p>
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
                    91,12 млн
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
                    23,24 млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q3 2022</p>
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
                    91,12 млн
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
                    23,24 млн
                  </p>
                </div>
              </div>
              <div class="box header flex">
                <div class="flex">
                  <svg class="icon">
                    <use href="${icons}#scale"></use>
                  </svg>
                  <p class="text-content">Q4 2022</p>
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
                    91,12 млн
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
                    23,24 млн
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
                  <p class="text-content">2023</p>
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
                  <p
                    class="text-content"
                    id="pipe-forecast--next-year--pipe-revenue"
                  >
                    345,12 млн
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
                    id="pipe-forecast--next-year--pipe-income"
                  >
                    97,54 млн
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
                  <p
                    class="text-content"
                    id="pipe-forecast--next-year--forecast-revenue"
                  >
                    106,24 млн
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
                    id="pipe-forecast--next-year--forecast-income"
                  >
                    27,79 млн
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="stats-monthly">

          <div class="grid grid--3-cols month box-container">
            <div class="box header flex">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#period"></use>
                </svg>
                <p class="text-content" id="stats-monthly--month-1">Январь</p>
              </div>
            </div>
            <div class="box standard flex">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#scale"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-monthly--month-1--forecast-revenue"
                >
                  106,24 млн
                </p>
              </div>
            </div>
            <div class="box standard flex">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#scale"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-monthly--month-1--forecast-income"
                >
                  27,79 млн
                </p>
              </div>
            </div>
            <div class="box standard flex">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#success"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-monthly--month-1--closed-success"
                >
                  2
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
                  id="stats-monthly--month-1--closed-success-revenue"
                >
                  106,24 млн
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
                  id="stats-monthly--month-1--closed-success-income"
                >
                  27,79 млн
                </p>
              </div>
            </div>
            <div class="box standard flex">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#failure"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-monthly--month-1--closed-failure"
                >
                  2
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
                  id="stats-monthly--month-1--closed-failure-revenue"
                >
                  106,24 млн
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
                  id="stats-monthly--month-1--closed-failure-income"
                >
                  27,79 млн
                </p>
              </div>
            </div>
            <div class="box standard flex">
              <div class="flex">
                <svg class="icon">
                  <use href="${icons}#deal"></use>
                </svg>
                <p
                  class="text-content"
                  id="stats-monthly--month-1--new-deals"
                >
                  2
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
                  id="stats-monthly--month-1--new-deals-revenue"
                >
                  106,24 млн
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
                  id="stats-monthly--month-1--new-deals-income"
                >
                  27,79 млн
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      </div>
      
    `;
  }
}

export default new StatsView();
