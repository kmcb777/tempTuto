import { BaseStore } from "fluxible/addons";

class ApplicationStore extends BaseStore {

  static storeName = "ApplicationStore"

  static handlers = {
    LOGIN_USER: "login",
    LOGOUT: "logout",
    INIT_CSRF_TOKEN: "setCsrf",
    START_LOADING: "startLoading",
    STOP_LOADING: "stopLoading"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.email = null;
    this.csrf = null;
    this.loaders = {};
  }

  setCsrf(csrf) {
    this.csrf = csrf;
    this.emitChange();
  }

  login(email) {
    this.email = email;
    this.emitChange();
  }

  logout() {
    this.email = null;
    this.emitChange();
  }

  getCsrf() {
    return this.csrf;
  }

  isLoggedIn() {
    return this.email;
  }

  isLoading(element) {
    return this.loaders[element]
  }

  startLoading(element) {
    this.loaders[element] = true
    this.emitChange()
  }

  stopLoading(element) {
    this.loaders[element] = false
    this.emitChange()
  }

  dehydrate() {
    return {
      email: this.email,
      csrf: this.csrf,
      loaders: this.loaders
    };
  }

  rehydrate(state) {
    this.email = state.email;
    this.csrf = state.csrf;
    this.loaders = state.loaders;
  }
}

export default ApplicationStore;
