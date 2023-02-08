import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._button.textContent = this._button.textContent+'...';
      this._submitForm(this._getInputValues()).finally(() => {
        this._button.textContent = this._button.textContent.replaceAll('...', '')
      });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
