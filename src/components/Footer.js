import React, { Component } from "react";
import { NavLink } from "fluxible-router";

if (process.env.BROWSER) {
  // require("../../style/front/grid10.scss");
  // require("../../style/front/Footer.scss");
}

class Footer extends Component {

  render() {
    return (

      <div className="row-wrapper Footer-wrapper">
        <div className="before-row"></div>
        <div className="Footer row">
          <div className="Footer-mission">
            TechShop - Ateliers Leroy Merlin a pour mission de démocratiser l'accès à des outils et machines jusque là réservés aux professionnels à travers la création d'ateliers collaboratifs de fabrication.
          </div>
        </div>
        <div className="after-row"></div>
      </div>
    );
  }

}

export default Footer;
