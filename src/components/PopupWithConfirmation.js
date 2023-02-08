import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._button = this._popup.querySelector('.popup__button');
    this._button.addEventListener('click', () => this._handleClick());
  }

  _handleClick(){
    this._okCallback && this._okCallback();
  }

  open(okCallback) {
    super.open();
    this._okCallback = okCallback;
  }

  close(){
    super.close();
    this._okCallback = null;
  }
}
