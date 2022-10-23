import React, { Component } from "react";
import "./CartOverlay.css";
import { closeCartOverlay } from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OverlayItem from "../overlayItem/OverlayItem";

class cartOverlay extends Component {
  constructor() {
    super();

    this.closeCartOverlayHandler = this.closeCartOverlayHandler.bind(this);
  }
  closeCartOverlayHandler() {
    this.props.closeCartOverlay();
  }
  render() {
    return (
      <div className='cart-overlay' onClick={this.closeCartOverlayHandler}>
        <div className='cart-overlay-wrapper'>
          <div className='cart-overlay-list'>
            {this.props.cart.map((item) => {
              return <OverlayItem {...item} />;
            })}
          </div>
          <Link to='/cart'>cart</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showCartOverlay: state.cart.showCartOverlay,
    cart: state.cart.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(cartOverlay);
