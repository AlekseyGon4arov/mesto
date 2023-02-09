import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
  profileEditButton,
  profileAddButton,
  profileAvatarButton,
  formProfileElement,
  nameProfileInput,
  jobProfileInput,
  formCardElement,
  formAvatarElement,
  validatorConfig,
  configApi
} from '../utils/constants.js';
import './index.css';

const api = new Api(configApi);

export const userInfo = new UserInfo({name: '.profile__title', about: '.profile__subtitle', avatar: '.profile__avatar-image'});

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  return api.setProfileData({name: data.editname, about: data.editjob}).then((data) => {
    userInfo.setUserInfo(data);
    popupEdit.close();
  }).catch((err) => {
    console.log(err);
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
  }).catch((err) => {
    console.log(err);
  });
});

popupCard.setEventListeners();

const popupViewer = new PopupWithImage('.popup_viewer');

popupViewer.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup_confirm')

popupConfirmation.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_update', ({updateavatar}) => {
  return api.updateAvatar({
    avatar: updateavatar
  }).then((data) => {
    if(data){
      userInfo.setUserInfo(data);
      popupAvatar.close();
    }
  }).catch((err) => {
    console.log(err);
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

function handleCardClick ({name, link}) {
  popupViewer.open({link, name});
};

function handleDeleteClick (card) {
  popupConfirmation.open(() => {
    api.deleteCard(card._id).then((res) => {
      popupConfirmation.close();
      card.remove();
    }).catch((err) => {
      console.log(err);
    });
  });
}

function handeLikeClick (card){
  const method = card.isLikedMe ? api.deleteLike : api.addLike;
  method(card._id).then((res) => {
    card.updateData(res);
  }).catch((err) => {
    console.log(err);
  });
}

function createCard(data) {
  return new Card({
    ...data,
    userInfo,
    templateSelector: "#card-template",
    handleCardClick,
    handleDeleteClick,
    handeLikeClick,
  }).getView();
};

api.getProfileData().then((data) => {
  userInfo.setUserInfo(data);
}).then(() => {
  api.getInitialCards().then((data) => {
    section.setItems(data.reverse());
    section.renderItems();
  });
}).catch((err) => {
    console.log(err);
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







