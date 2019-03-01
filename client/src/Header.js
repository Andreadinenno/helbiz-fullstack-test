import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //default fixed function of a component
  render() {
    return (
      <Menu style={{ marginTop: "20px" }}>
        <Link to="/" className="item">
          Dashboard
        </Link>
        <Link className="item" to="/Transfer">
          Transfer money
        </Link>
      </Menu>
    );
  }
}

export default Header;
