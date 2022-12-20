class FormValidator{
  constructor({
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClassVisible,
    inactiveButtonClass
  }, formElement){
    this._formElement = formElement;
    this._inputErrorClass = inputErrorClass;
    this._errorClassVisible = errorClassVisible;
    this._inactiveButtonClass = inactiveButtonClass;
    this._buttonElement = formElement.querySelector(submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(inputSelector));
  }

  _setEventListeners(){
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._checkButtonState();
      });
    });
    this._checkButtonState();
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClassVisible);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClassVisible);
    errorElement.textContent = '';
  }

  _checkButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
  };

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  enableValidation() {
    this._setEventListeners();
  }

}

export default FormValidator;
