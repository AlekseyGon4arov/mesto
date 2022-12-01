const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClassVisible) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClassVisible);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClassVisible) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClassVisible);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, inputErrorClass, errorClassVisible) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClassVisible);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClassVisible);
  }
};

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClassVisible, buttonElement, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClassVisible);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

function enableValidation({
  formSelector,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
  errorClassVisible
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    setEventListeners(formElement, inputSelector, inputErrorClass, errorClassVisible, buttonElement, inactiveButtonClass);
  });
};





