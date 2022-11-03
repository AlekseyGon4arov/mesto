// Находим элементы в DOM
let profileButton = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let popupCloseButton = popupElement.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__item_data_name');
let jobInput = document.querySelector('.popup__item_data_job');
let formElement = document.querySelector('.popup__form');

// Функция открытия попап и переноса значений в форму
function openPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupElement.classList.add('popup_opened');
};

// Функция закрытия попап
function closePopup () {
  popupElement.classList.remove('popup_opened');
};

// Функция для переноса значений при нажатиии на кнопку Сохранить
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup ();
}

// События
profileButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
