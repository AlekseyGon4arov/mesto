class Card {
  constructor({ name, link, templateSelector, handleImage }){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImage = handleImage;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _setData() {
      const name = this.newCard.querySelector('.card__title');
      name.textContent = this._name;
      this._cardImage = this.newCard.querySelector('.card__image');
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', (event) => {
      this._handleImage({ name: this._name, link: this._link});
    });

    this._likeElement = this.newCard.querySelector('.card__like');
    this._likeElement.addEventListener('click', () => this._handleLike());

    this._deleteElement = this.newCard.querySelector('.card__delete-icon');
    this._deleteElement.addEventListener('click', () => this._handleDelete());
  }

  _handleLike() {
    this._likeElement.classList.toggle('card__like_active');
  }

  _handleDelete() {
    this.newCard.remove();
  }

  getView() {
    this.newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this.newCard;
  }
}

export default Card;
