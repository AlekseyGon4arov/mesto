export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({name, about, avatar, _id}) {
    if (name) this._name.textContent = name;
    if (about) this._about.textContent = about;
    if (avatar) this._avatar.src = avatar;
    if(_id) this._id = _id;
  }
}
