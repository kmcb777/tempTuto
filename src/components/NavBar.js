import React, { Component } from "react"
import { NavLink } from "fluxible-router"
import connectToStores from 'fluxible/addons/connectToStores'

if (process.env.BROWSER) {
  // require("../../style/front/NavBar.scss")
}

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayMenu: false
    }
  }

  static defaultProps = {
    email: 'null'
  }

  componentDidMount() {
    // let _this = this
    //
    // this.previousScrollPos = $(window).scrollTop()
    //
    // $(window).on("scroll.navbar", _.throttle(() => {
    //
    //   let newScrollPos = $(window).scrollTop()
    //
    //   if (newScrollPos <= _this.previousScrollPos) {
    //     _this.handleDisplayMenu()
    //   }
    //   else {
    //     _this.handleHideMenu()
    //   }
    //
    //   _this.previousScrollPos = newScrollPos
    // }, 500, {trailing: true}))
  }

  componentWillUnmount() {
    // $(window).off("scroll.navbar")
  }

  handleDisplayMenu() {
    this.setState({ displayMenu: true })
  }

  handleHideMenu() {
    this.setState({ displayMenu: false })
  }

  renderMenu() {
    const classes = "NavBar-menu"

    return (
      <div className={ classes }>
        <ul>
          <li onClick={this.handleHideMenu.bind(this)} >
            <NavLink routeName="home">
              Home
            </NavLink>
          </li>

          <li onClick={this.handleHideMenu.bind(this)} >
            <NavLink routeName="other">
              Autre
            </NavLink>
          </li>

        </ul>
        <div className="NavBar-social-icons">
          <a target="_blank" href="https://www.facebook.com/techshopleroymerlin">
            <div className="ico-facebook"></div>
          </a>
          <a target="_blank" href="https://twitter.com/TechShopLM">
            <div className="ico-twitter"></div>
          </a>
          <a target="_blank" href="https://instagram.com/techshoplm">
            <div className="ico-instagram"></div>
          </a>
        </div>
      </div>
    )
  }

  renderMenuDisplayBtn() {
    if (this.state.displayMenu) {
      return (
        <div className="NavBar-menu-btn-container" onClick={this.handleHideMenu.bind(this)}>
          <div className="NavBar-menu-close-btn"></div>
        </div>
      )
    }
    else {
      return (
        <div className="NavBar-menu-btn-container" onClick={this.handleDisplayMenu.bind(this)}>
          <div className="NavBar-menu-btn"></div>
        </div>
      )
    }
  }

  render() {
    const { displayMenu } = this.state

    const backgroundColorClass = "after-row"

    return (
      <div className="row-wrapper Navbar-wrapper">
        <div className="before-row"></div>
        <div className="NavBar">
          <div className="NavBar-logoAndButtonContainer">
            <NavLink routeName="home">
              <div className="NavBar-logo-container">
                <div className="NavBar-logo"></div>
              </div>
            </NavLink>
            {this.renderMenuDisplayBtn()}
          </div>
          {this.renderMenu()}

        </div>
        <div className={ backgroundColorClass }></div>
      </div>
    );
  }

}

NavBar = connectToStores(NavBar, ["ApplicationStore"], function(stores /*, props*/) {
  return {
    email: stores.ApplicationStore.isLoggedIn()
  };
});

export default NavBar;
