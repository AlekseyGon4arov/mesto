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
      const cardImage = this.newCard.querySelector('.card__image');
      cardImage.src = this._link;
      cardImage.alt = this._name;
  }

  _setEventListeners() {
    const cardImage = this.newCard.querySelector('.card__image');
    cardImage.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleImage({ name: this._name, link: this._link});
    });

    const like = this.newCard.querySelector('.card__like');
    like.addEventListener('click', this._handleLike);

    const deleteButton = this.newCard.querySelector('.card__delete-icon');
    deleteButton.addEventListener('click', (event) => this._handleDelete(event));
  }

  _handleDelete(event) {
    event.preventDefault();
    console.log(this.newCard);
    this.newCard.remove();
  }

  _handleLike(event) {
    event.preventDefault();
    event.target.classList.toggle('card__like_active');
  }

  getView() {
    this.newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this.newCard;
  }
}

export default Card;
