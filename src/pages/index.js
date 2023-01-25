import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  formProfileElement,
  nameProfileInput,
  jobProfileInput,
  formCardElement,
  validatorConfig
} from '../utils/constants.js';
import {
  createCard
} from '../utils/utils.js';
import './index.css';

const userInfo = new UserInfo({name: '.profile__title', info: '.profile__subtitle'})

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
    userInfo.setUserInfo({nameInfo: data.editname, jobInfo: data.editjob});
    popupEdit.close();
});

popupEdit.setEventListeners();

const popupCard = new PopupWithForm('.popup_card', (data) => {
  const cardData = {
    name: data.editname,
    link: data.editimage
  };
    section.addItem(createCard(cardData));
    popupCard.close();
});

popupCard.setEventListeners();

const formProfileValidator = new FormValidator(validatorConfig, formProfileElement);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validatorConfig, formCardElement);
formCardValidator.enableValidation();

const section = new Section({
    items: initialCards.reverse(),
    renderer: (data) => {
      return createCard(data);
    }
  }, '.cards');

section.renderItems();

profileEditButton.addEventListener('click', () => {
  popupEdit.open();
  const profileInfo = userInfo.getUserInfo();
  nameProfileInput.value = profileInfo.nameInfo;
  jobProfileInput.value = profileInfo.jobInfo;
});

profileAddButton.addEventListener('click', () => {
  popupCard.open();
  formCardValidator.disableButton();
});
