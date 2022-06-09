import React, { Component } from "react";
import "./Container.css";

export class Container extends Component {
  render() {
    return (
      <div className={`container ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
