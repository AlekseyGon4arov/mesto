import Card from './Card.js';

import FormValidator from './FormValidator.js';

import { initialCards } from './Constants.js';

// DOM узлы
const cardsContainer = document.querySelector('.cards');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditElement = document.querySelector('.popup_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCardElement = document.querySelector('.popup_card');
const popupViewerElement = document.querySelector('.popup_viewer');
const popupImageViewerElement = document.querySelector('.popup__image_viewer');
const popupTitleViewerElement = document.querySelector('.popup__image-title_viewer');

const popupElements = document.querySelectorAll('.popup');

const formProfileElement = document.querySelector('.popup__form_profile');
const nameProfileInput = formProfileElement.querySelector('.popup__input_data_name');
const jobProfileInput = formProfileElement.querySelector('.popup__input_data_job');

const formCardElement = document.querySelector('.popup__form_card');
const formCardButton = formCardElement.querySelector('.popup__button');
const nameCardInput = formCardElement.querySelector('.popup__input_data_name');
const imageCardInput = formCardElement.querySelector('.popup__input_data_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const inactiveButtonClass = 'popup__button_disabled';

const validatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClassVisible: 'popup__input-error_active',
  inactiveButtonClass,
};

const formProfileValidator = new FormValidator(validatorConfig, formProfileElement);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validatorConfig, formCardElement);
formCardValidator.enableValidation();


function handleImage ({name, link}) {
  openPopup(popupViewerElement);
  popupImageViewerElement.src = link;
  popupImageViewerElement.alt = name;
  popupTitleViewerElement.textContent = name;
};

// Отрисовка карточки
const renderCard = (card, container) => {
  container.prepend(card);
};

function createCard({name, link}) {
  return new Card({
    name,
    link,
    templateSelector: "#card-template",
    handleImage
  }).getView();
};

// Перебор карточек
initialCards.reverse().forEach((cardData) => {
  renderCard(createCard(cardData), cardsContainer);
});

function handleFormCardSubmit (event) {
  event.preventDefault();
  const cardData = {
    name: nameCardInput.value,
    link: imageCardInput.value
  };
    event.target.reset();
    renderCard(createCard(cardData), cardsContainer);
  closePopup(popupCardElement);

  formCardValidator.disableButton();
};

const handleEsc = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
};

// Функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
};

// Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
};

// Функция для переноса значений при нажатиии на кнопку Сохранить
function handleFormProfileSubmit (event) {
    event.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileJob.textContent = jobProfileInput.value;
    closePopup(popupEditElement);
};

// События
profileEditButton.addEventListener('click', () => {
  openPopup(popupEditElement);
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupCardElement);
});

popupElements.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup') ||
      event.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

formCardElement.addEventListener('submit', handleFormCardSubmit);



