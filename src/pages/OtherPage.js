import React, { PropTypes } from "react";

class HomePage extends React.Component {

  static propTypes = {
  }

  render() {
    const { err } = this.props;
    return (
      <div>
        <h1>Other</h1>

        <p>And a happy new year</p>
      </div>
    );
  }

}

export default HomePage;
