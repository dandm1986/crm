import View from './View';

class LoginView extends View {
  _parentElement = document.querySelector('.container--main-view');
  _errorMessage = ``;

  addHandlerLogin(handler) {
    const login = document.querySelector(`#login`);
    const password = document.querySelector(`#password`);
    const loginBtn = document.querySelector(`#auth-form--submit-btn`);
    loginBtn.addEventListener(`click`, e => {
      e.preventDefault();
      const loginData = new Object({
        userName: login.value,
        password: password.value,
      });
      login.value = password.value = '';
      login.blur();
      handler(loginData);
    });
  }

  _generateMarkup() {
    return `
    <div class="sign-in flex">
      <form action="#" class="form form--sign-in">
        <input type="text" id="login" placeholder="Логин" required />
        <input
          type="text"
          id="password"
          placeholder="Пароль"
          style="-webkit-text-security: circle"
          required
        />
        <button class="btn flex btn-form" id="auth-form--submit-btn">
          Войти
        </button>
      </form>
    </div>
    `;
  }
}

export default new LoginView();
