export default class Section {
  constructor({items = [], renderer}, containerSelector) {
    this._initialItems = items;
    this._createData = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItems(items = []) {
    this._initialItems = items;
  }

  renderItems() {
    this._initialItems.forEach((item) => {
      this.addItem(this._createData(item));
    })
  }
}
