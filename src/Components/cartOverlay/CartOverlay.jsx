import React, { Component } from "react";
import "./CartOverlay.css";

export default class cartOverlay extends Component {
  closeCartOverlayHandler() {}
  render() {
    return (
      <div
        className='cart-overlay'
        onClick={this.closeCartOverlayHandler.bind(this)}>
        <div className='cart-overlay-wrapper'></div>
      </div>
    );
  }
}
