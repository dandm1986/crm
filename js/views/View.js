import icons from 'url:../../img/icons/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    // TODO: understand what is happening here
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  _clear() {
    this._parentElement.innerHTML = ``;
    this._parentElement.value = ``;
  }

  renderSpinner() {
    const markup = `
        <div class="spinner flex">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}
