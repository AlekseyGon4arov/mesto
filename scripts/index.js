// DOM узлы
const cardsContainer = document.querySelector('.cards');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditElement = document.querySelector('.popup_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCardElement = document.querySelector('.popup_card');
const popupViewerElement = document.querySelector('.popup_viewer');
const popupImageViewerElement = document.querySelector('.popup__image_viewer');
const popupTitleViewerElement = document.querySelector('.popup__image-title_viewer');


const popupCloseButtons = document.querySelectorAll('.popup__close');

const formProfileElement = document.querySelector('.popup__form_profile');
const nameProfileInput = formProfileElement.querySelector('.popup__item_data_name');
const jobProfileInput = formProfileElement.querySelector('.popup__item_data_job');

const formCardElement = document.querySelector('.popup__form_card');
const nameCardInput = formCardElement.querySelector('.popup__item_data_name');
const imageCardInput = formCardElement.querySelector('.popup__item_data_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

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

function likeHandler (event) {
  event.preventDefault();
  event.target.classList.toggle('card__like_active');
};

function deleteButtonHandler (event) {
  event.preventDefault();
  const card = event.target.closest('.card');
  card.closest('.cards').removeChild(card);
};

function imageHandler (event) {
  event.preventDefault();
  const image = event.target.src;
  const title = event.target.closest('.card').querySelector('.card__title').textContent;
  openPopup(popupViewerElement);
  popupImageViewerElement.src = image;
  popupTitleViewerElement.textContent = title;
};

// Создание карточек
const createCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.card__title');
  name.textContent = dataCard.name;

  const link = newCard.querySelector('.card__image');
  link.src = dataCard.link;

  const like = newCard.querySelector('.card__like');
  like.addEventListener('click', likeHandler);

  const deleteButton = newCard.querySelector('.card__delete-icon');
  deleteButton.addEventListener('click', deleteButtonHandler);

  const image = newCard.querySelector('.card__image');
  image.addEventListener('click', imageHandler);


  return newCard;
};

// Добавление карточек
const renderCard = (card, container) => {
  container.prepend(card);
};

// Рендер карточек
initialCards.reverse().forEach((dataCard) => {
  renderCard(createCard(dataCard), cardsContainer);
});

function formCardSubmitHandler (event) {
  event.preventDefault();
  const dataCard = {
    name: nameCardInput.value,
    link: imageCardInput.value
  };
  nameCardInput.value = '';
  imageCardInput.value = '';
  renderCard(createCard(dataCard), cardsContainer);
  closePopup(event.target.closest('.popup'));
};




// Функция открытия попап и переноса значений в форму
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Функция для переноса значений при нажатиии на кнопку Сохранить
function formProfileSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileJob.textContent = jobProfileInput.value;
    const popup = evt.target.closest('.popup');
    closePopup(popup);
};

// События
profileEditButton.addEventListener('click', () => {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
  openPopup(popupEditElement);
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupCardElement);
});


popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

formProfileElement.addEventListener('submit', formProfileSubmitHandler);

formCardElement.addEventListener('submit', formCardSubmitHandler);

