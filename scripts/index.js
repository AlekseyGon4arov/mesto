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
const nameCardInput = formCardElement.querySelector('.popup__input_data_name');
const imageCardInput = formCardElement.querySelector('.popup__input_data_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

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

// Шаблон template
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function handleLike (event) {
  event.preventDefault();
  event.target.classList.toggle('card__like_active');
};

function handleDelete (event) {
  event.preventDefault();
  const card = event.target.closest('.card');
  card.remove();
};

function handleImage (event) {
  event.preventDefault();
  const image = event.target.src;
  const title = event.target.closest('.card').querySelector('.card__title').textContent;
  openPopup(popupViewerElement);
  popupImageViewerElement.src = image;
  popupImageViewerElement.alt = title;
  popupTitleViewerElement.textContent = title;
};

// Создание карточек
const createCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.card__title');
  name.textContent = dataCard.name;

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardImage.addEventListener('click', handleImage);

  const like = newCard.querySelector('.card__like');
  like.addEventListener('click', handleLike);

  const deleteButton = newCard.querySelector('.card__delete-icon');
  deleteButton.addEventListener('click', handleDelete);

  return newCard;
};

// Отрисовка карточки
const renderCard = (card, container) => {
  container.prepend(card);
};

// Перебор карточек
initialCards.reverse().forEach((dataCard) => {
  renderCard(createCard(dataCard), cardsContainer);
});

function handleFormCardSubmit (event) {
  event.preventDefault();
  const dataCard = {
    name: nameCardInput.value,
    link: imageCardInput.value
  };
  event.target.reset();
  renderCard(createCard(dataCard), cardsContainer);
  closePopup(event.target.closest('.popup'));
};

// Функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    popupElements.forEach((popup) => {
      closePopup(popup);
    });
  }
});

popupElements.forEach((popup) => {
  const button = popup.querySelector('.popup__close');
  const popupContainer = popup.querySelector('.popup__container')
  button.addEventListener('click', () => {
    closePopup(popup);
  });
  popup.addEventListener('click', () => {
    closePopup(popup);
  });
  popupContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});

formProfileElement.addEventListener('submit', handleFormProfileSubmit);

formCardElement.addEventListener('submit', handleFormCardSubmit);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassVisible: 'popup__input-error_active'
});




