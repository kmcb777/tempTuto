// Express middleware to render the app server-side and expose its state
// to the client
const debug = require("debug")("techshop-fr:apps/render");

import React from "react";
import serialize from "serialize-javascript";

import app from "./app";
import HtmlDocument from "../components/HtmlDocument";

import { navigateAction } from "fluxible-router";
import { initApplicationStore } from "../actions/ServerActionCreators";

let webpackStats;

if (process.env.NODE_ENV === "production") {
  webpackStats = require("../../tmp/webpack-stats.json");
}

function renderApp(req, res, context, next) {
  debug("About to render front application.")

  if (true) { // process.env.NODE_ENV === "development"
    webpackStats = require("../../tmp/webpack-stats.json");

    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve("../../tmp/webpack-stats.json")];
  }

  // dehydrate the app and expose its state
  const state = "window.App=" + serialize(app.dehydrate(context)) + ";";

  const Application = app.getComponent();

  try {
    // Render the Application to string
    const markup = React.renderToString(
      <Application context={ context.getComponentContext() } />
    );

    // The application component is rendered to static markup
    // and sent as response.
    const html = React.renderToStaticMarkup(
      <HtmlDocument
        context={ context.getComponentContext() }
        lang={req.locale}
        state={state}
        markup={markup}
        script={webpackStats.front.script}
        css={webpackStats.front.css}
      />
    );
    const doctype = "<!DOCTYPE html>";
    res.send(doctype + html);
  }
  catch (e) {
    debug(`Something went wrong: ${e}`)
    next(e);
  }
}

function render(req, res, next) {
  debug(`In front middleware for url: ${req.url}. User exists?"`, !!req.user)
  // Create a fluxible context (_csrf is needed by the fetchr plugin)
  const context = app.createContext({
    req: req,
    xhrContext: {
      // _csrf: req.csrfToken()
    }
  });
  console.log('user :' + JSON.stringify(req.user));
  let email = req.user ? req.user.email : null;

  // Fill the intl store with the messages according to locale and
  // execute the navigate action to fill the RouteStore
  // (here we make use of executeAction returning a promise)
  Promise.all([
      // context.executeAction(initApplicationStore, { csrf: req.csrfToken(), email: email }),
      context.executeAction(navigateAction, { url: `${req.url}` })
    ]).then(() => renderApp(req, res, context, next))
      .catch((err) => {
        let statusCode = err.statusCode;

        debug(`Status code: ${statusCode}`);
        if (statusCode === 301 || statusCode === 302) {
          res.redirect(err.redirectUrl);
        }

        if (!statusCode) {
          debug("Unhandled React error", err)
          next(err);
        }
        else {
          renderApp(req, res, context, next);
        }
      });

}

export default render;
