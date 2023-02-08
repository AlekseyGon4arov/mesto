export const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'a2637c42-4a28-455c-a95c-7afb1c7116d8',
    'Content-Type': 'application/json'
  }
};
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAvatarButton = document.querySelector('.profile__avatar');
export const formProfileElement = document.querySelector('.popup__form_profile');
export const formAvatarElement = document.querySelector('.popup__form_update');
export const nameProfileInput = formProfileElement.querySelector('.popup__input_data_name');
export const jobProfileInput = formProfileElement.querySelector('.popup__input_data_job');
export const formCardElement = document.querySelector('.popup__form_card');
export const inactiveButtonClass = 'popup__button_disabled';
export const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClassVisible: 'popup__input-error_active',
  inactiveButtonClass,
};


