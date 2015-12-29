import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";

import { xhrPath } from "../constants/services";

import routes from "./routes";

import Application from "../components/Application";

import HtmlHeadStore from "../stores/HtmlHeadStore";

import ApplicationStore from "../stores/ApplicationStore";
// import UserStore from "../stores/UserStore";

// import moment from "moment";
// moment.locale("fr");

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: xhrPath }));

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(HtmlHeadStore);
app.registerStore(ApplicationStore);
// app.registerStore(UserStore);


export default app;
