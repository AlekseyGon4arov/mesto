import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popupViewer = new PopupWithImage('.popup_viewer').setEventListeners();

export function handleCardClick ({name, link}) {
  popupViewer.open({link, name});
};

export function createCard({name, link}) {
  return new Card({
    name,
    link,
    templateSelector: "#card-template",
    handleCardClick
  }).getView();
};
