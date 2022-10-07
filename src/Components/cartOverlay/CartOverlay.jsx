import React, { Component } from "react";
import "./CartOverlay.css";
import { closeCartOverlay } from "../../redux/actions/cartActions";
import { connect } from "react-redux";

class cartOverlay extends Component {
  constructor() {
    super();

    this.closeCartOverlayHandler = this.closeCartOverlayHandler.bind(this);
  }
  closeCartOverlayHandler() {
    console.log(this.props);
    this.props.closeCartOverlay();
  }
  render() {
    return (
      <div className='cart-overlay' onClick={this.closeCartOverlayHandler}>
        <div className='cart-overlay-wrapper'></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showCartOverlay: state.cart.showCartOverlay,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(cartOverlay);
