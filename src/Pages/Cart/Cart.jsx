import React, { Component } from "react";
import Container from "../../Components/Container/Container";
import "./Cart.css";
import { connect } from "react-redux";
import CartItem from "../../Components/cartItem/CartItem";

class Cart extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className='cart'>
        <Container className='cart-container'>
          <h1 className='cart-title'> Cart </h1>
          <div className='cart-items-list-wrapper'>
            {cart.length ? (
              cart.map((item) => {
                return <CartItem {...item} />;
              })
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
          <div className='cart-total-nums'>
            <p className='persentage'>
              Tax 21%{" "}
              <span>
                {this.props.currencySymbol}
                {((this.props.total / 100) * 21).toFixed(2)}
              </span>
            </p>
            <p className='cart-cuanity'>
              Quantity: <span>{this.props.amount}</span>
            </p>
            <p className='cart-total'>
              Total:{" "}
              <span>
                {this.props.currencySymbol}
                {this.props.total.toFixed(2)}
              </span>
            </p>
          </div>
          <div className='cart-order-btn'>
            <button>ORDER</button>
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
    amount: state.cart.amount,
    currencySymbol: state.cart.currencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
