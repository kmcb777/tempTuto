import HomePage from "../pages/HomePage"
import OtherPage from "../pages/OtherPage"



export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage
  },

  other: {
    path: "/other",
    method: "get",
    handler: OtherPage
  }
  
}
