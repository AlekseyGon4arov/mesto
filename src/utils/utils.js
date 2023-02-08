import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import {configApi} from '../utils/constants.js';

export const api = new Api(configApi);

const popupViewer = new PopupWithImage('.popup_viewer');

popupViewer.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup_confirm')

popupConfirmation.setEventListeners();

export function handleCardClick ({name, link}) {
  popupViewer.open({link, name});
};

export function handleDeleteClick (card) {
  popupConfirmation.open(() => {
    api.deleteCard(card._id).then((res) => {
      popupConfirmation.close();
      card._remove();
    });
  });
}

export function handeLikeClick (card){
  const method = card.isLikedMe ? api.deleteLike : api.addLike;
  method(card._id).then((res) => {
    card._updateData(res);
  });
}

export function createCard(data) {
  return new Card({
    ...data,
    templateSelector: "#card-template",
    handleCardClick,
    handleDeleteClick,
    handeLikeClick,
  }).getView();
};
