const debug = require("debug")("techshop-fr:actions/ServerActionCreators");

const TIMEOUT = 20000;

const ServerActionCreators = {
  initApplicationStore(context, payload, done) {
    context.dispatch("INIT_CSRF_TOKEN", payload.csrf);

    if (payload.email) {
      context.dispatch("LOGIN_USER", payload.email);
    }

    done();
  }
};

export default ServerActionCreators;
