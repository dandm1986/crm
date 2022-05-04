import icons from 'url:../../img/icons/icons.svg';
import { USER_DATA } from '../config.js';
import View from './View';

class HeaderView extends View {
  _parentElement = document.querySelector('.header-heading');
  _errorMessage = ``;

  addHandlerDownload(handler) {
    const downloadBtn = document.querySelector(`#menu--download`);
    downloadBtn.addEventListener(`click`, handler);
  }
  addHandlerStats(handler) {
    const statsBtn = document.querySelector(`#menu--stats`);
    statsBtn.addEventListener(`click`, function (e) {
      handler();
    });
  }
  addHandlerHome(handler) {
    const homeBtn = document.querySelector(`#menu--home`);
    homeBtn.addEventListener(`click`, handler);
  }
  addHandlerLogout(handler) {
    const logoutBtn = document.querySelector(`#menu--logout`);
    logoutBtn.addEventListener(`click`, e => {
      this._parentElement.innerHTML = ``;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <p id="user-name">${USER_DATA.firstName} ${USER_DATA.lastName}</p>
    <div class="menu-options flex">
      <a href="#" class="btn flex btn--full" id="menu--download">
        <svg class="icon">
          <use href="${icons}#dowload"></use>
        </svg>
      </a>
      <a href="#" class="btn flex btn--full" id="menu--stats">
        <svg class="icon">
          <use href="${icons}#stats"></use>
        </svg>
      </a>
      <a href="#" class="btn flex btn--full" id="menu--home">
        <svg class="icon">
          <use href="${icons}#home"></use>
        </svg>
      </a>
      <a href="#" class="btn flex btn--full" id="menu--logout">
        <svg class="icon">
          <use href="${icons}#exit"></use>
        </svg>
      </a>
    </div>
    `;
  }
}

export default new HeaderView();
