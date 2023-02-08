import {userInfo} from '../pages';

class Card {
  constructor({ name, link, templateSelector, handleCardClick, likes, owner, handleDeleteClick, _id, handeLikeClick}){
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handeLikeClick = handeLikeClick;
    this._ownerId = owner._id;
    this._id = _id;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    if(this._ownerId !== userInfo._id){
      template.querySelector('.card__delete-icon').remove();
    }

    return template;
  }

  _setData() {
      const name = this.newCard.querySelector('.card__title');
      name.textContent = this._name;
      this._cardImage = this.newCard.querySelector('.card__image');
      this._cardLikeCount = this.newCard.querySelector('.card__like_count');
      this.isLikedMe = this._likes.map(like => like._id).includes(userInfo._id);
      if(this.isLikedMe){
        this._likeElement.classList.add('card__like_button_active');
      }
      else{
        this._likeElement.classList.remove('card__like_button_active');
      }
      this._cardLikeCount.textContent = this._likes.length;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
  }

  _updateData({likes}) {
    this._likes = likes;
    this._setData();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link});
    });

    this._likeElement.addEventListener('click', () => this._handleLike());

    this._deleteElement = this.newCard.querySelector('.card__delete-icon');
    if(this._deleteElement){
      this._deleteElement.addEventListener('click', () => this._handleDelete());
    }
  }

  _handleLike() {
    this._handeLikeClick(this);
  }

  _handleDelete() {
    this._handleDeleteClick(this);
  }

  _remove() {
    this.newCard.remove();
  }

  getView() {
    this.newCard = this._getTemplate();
    this._likeElement = this.newCard.querySelector('.card__like_button');
    this._setData();
    this._setEventListeners();

    return this.newCard;
  }
}

export default Card;
