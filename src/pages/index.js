import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  profileEditButton,
  profileAddButton,
  profileAvatarButton,
  formProfileElement,
  nameProfileInput,
  jobProfileInput,
  formCardElement,
  formAvatarElement,
  validatorConfig
} from '../utils/constants.js';
import {
  createCard,
  api
} from '../utils/utils.js';
import './index.css';

export const userInfo = new UserInfo({name: '.profile__title', about: '.profile__subtitle', avatar: '.profile__avatar-image'});

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
    return api.setProfileData({name: data.editname, about: data.editjob}).then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    });

});

popupEdit.setEventListeners();

const popupCard = new PopupWithForm('.popup_card', (data) => {
  const cardData = {
    name: data.editname,
    link: data.editimage
  };
  return api.createCard(cardData).then((data) => {
    section.addItem(createCard(data));
    popupCard.close();
  });
});

popupCard.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_update', ({updateavatar}) => {
  return api.updateAvatar({
    avatar: updateavatar
  }).then((data) => {
    if(data){
      userInfo.setUserInfo(data);
      popupAvatar.close();
    }
  });
});

popupAvatar.setEventListeners();

const formProfileValidator = new FormValidator(validatorConfig, formProfileElement);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validatorConfig, formCardElement);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validatorConfig, formAvatarElement);
formAvatarValidator.enableValidation();

const section = new Section({
    renderer: (data) => {
      return createCard(data);
    }
  }, '.cards');

api.getProfileData().then((data) => {
  userInfo.setUserInfo(data);
}).then(() => {
  api.getInitialCards().then((data) => {
    section.setItems(data.reverse());
    section.renderItems();
  });
});

profileEditButton.addEventListener('click', () => {
  popupEdit.open();
  const {name, about} = userInfo.getUserInfo();
  nameProfileInput.value = name;
  jobProfileInput.value = about;
});

profileAddButton.addEventListener('click', () => {
  popupCard.open();
  formCardValidator.disableButton();
});

profileAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarValidator.disableButton();
});







