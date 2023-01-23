export default class UserInfo {
  constructor({name, info}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  getUserInfo() {
    return {
      nameInfo: this._name.textContent,
      jobInfo: this._info.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.nameInfo;
    this._info.textContent = data.jobInfo;
  }
}
