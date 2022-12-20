import Card from './Card.js';

import FormValidator from './FormValidator.js';

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

// чтобы валидция срабатывала с учетом дефотного текста
nameProfileInput.value = profileName.textContent;
jobProfileInput.value = profileJob.textContent;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

// Перебор карточек
initialCards.reverse().forEach(({name, link}) => {
  renderCard(new Card({
    name,
    link,
    templateSelector: "#card-template",
    handleImage
  }).getView(), cardsContainer);
});

function handleFormCardSubmit (event) {
  event.preventDefault();
  const dataCard = {
    name: nameCardInput.value,
    link: imageCardInput.value
  };
    event.target.reset();
    renderCard(new Card({
      ...dataCard,
      templateSelector: "#card-template",
      handleImage
    }).getView(), cardsContainer);
  closePopup(popupCardElement);
  disableButton(formCardButton, inactiveButtonClass);
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

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClassVisible: 'popup__input-error_active',
    inactiveButtonClass,
  }, formElement).enableValidation();
});



