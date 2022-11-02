// Находим элементы в DOM
let profElem = document.querySelector('.profile__button');
let popupElem = document.querySelector('.popup');
let popupCloseElem = popupElem.querySelector('.popup__close');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="job"]');
let formElement = document.querySelector('.popup__edit');

// Переменные для изменения значаений
let nameValue = name;
let jobValue = job;

// Функция открытия попап и переноса значений в форму
function openPopup () {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  popupElem.classList.add('popup__open');
};

// Функция закрытия попап
function closePopup () {
  popupElem.classList.remove('popup__open');
};

// Функция для переноса значений при нажатиии на кнопку Сохранить
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closePopup ();
}

// События
profElem.addEventListener('click', openPopup);

popupCloseElem.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
