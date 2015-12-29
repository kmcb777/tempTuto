import keyMirror from "react/lib/keyMirror";

const Actions = keyMirror({

  RECEIVE_USER: null,

  RECEIVE_POST: null,
  RECEIVE_POSTS: null,
  RESET_POST_FORM_STORE: null,
  DELETE_POST: null,

  LOAD_INTL: null,

  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null

});

export default Actions;
