import React, { Component, PropTypes } from "react";

import Footer from "./Footer";
import NavBar from "./NavBar";

if (process.env.BROWSER) {
  // require("../../style/front/Page.scss");
}

class Page extends Component {

  static propTypes = {
    footer: PropTypes.bool
  }

  static defaultProps = {
    footer: true
  }

  render() {
    const { footer, message } = this.props;

    return (
      <div className="Page">
        <NavBar />
        <div className="Page-body">
          { this.props.children }
        </div>

        { footer &&
          <div className="Page-footer">
            <Footer />
          </div> }
      </div>
    );
  }

}

export default Page;
