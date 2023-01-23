import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputData = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputData.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitForm(this._getInputValues());
    });
    return this;
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
