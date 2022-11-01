// Находим элементы в DOM
let profElem = document.querySelector('.profile__button');
let popupElem = document.querySelector('.popup');
let popupCloseElem = popupElem.querySelector('.popup__close');
let popupEdit = document.querySelector('.popup__edit');

// Функции для открытия и закрытия попапа
function openPopup () {
  popupElem.classList.add('popup__open');
};

function closePopup () {
  popupElem.classList.remove('popup__open');
  renderValues();
};

profElem.addEventListener('click', openPopup);

popupCloseElem.addEventListener('click', closePopup);

// Переменные для значения в профиле
let nameValue = 'Жак-Ив Кусто';
let jobValue = 'Исследователь океана';

// Функция отрисовки профиля
function renderValues () {
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');
  let nameInput = document.querySelector('input[name="name"]');
  let jobInput = document.querySelector('input[name="job"]');

  name.textContent = nameValue;
  nameInput.value = nameValue;

  job.textContent = jobValue;
  jobInput.value = jobValue;
};

renderValues();

// Обработчик отправки формы
popupEdit && popupEdit.addEventListener('submit', function(event){
  event.preventDefault();
  nameValue = event.target.querySelector('[name="name"]').value;
  jobValue = event.target.querySelector('[name="job"]').value;
  closePopup();
});
