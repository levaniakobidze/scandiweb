import React, { Component } from "react";
import "./CartOverlay.css";
import { closeCartOverlay } from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OverlayItem from "../overlayItem/OverlayItem";
import Container from "../Container/Container";

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
        <Container className='cart-overlay-cont'>
          <div
            className='cart-overlay-wrapper'
            onClick={(e) => e.stopPropagation()}>
            <p className='my-bag'>
              My Bag, <span>{this.props.amount} items</span>
            </p>
            <div className='cart-overlay-list'>
              {this.props.cart.map((item) => {
                return <OverlayItem {...item} />;
              })}
            </div>
            <div className='total-cont'>
              <p>Total</p>
              <span>{this.props.total.toFixed(2)}</span>
            </div>
            <div className='btns'>
              <Link
                className='bag-btn'
                onClick={this.closeCartOverlayHandler}
                to='/cart'>
                View bag
              </Link>
              <a className='checkout-btn'>Checkout</a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showCartOverlay: state.cart.showCartOverlay,
    cart: state.cart.cart,
    total: state.cart.total,
    amount: state.cart.amount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(cartOverlay);
