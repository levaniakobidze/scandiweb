import React, { Component } from "react";
import Container from "../../Components/Container/Container";
import "./Cart.css";
import { connect } from "react-redux";
import CartItem from "../../Components/cartItem/CartItem";

class Cart extends Component {
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.cart != this.props.cart) {
    // }
    // console.log("loger");
  }

  render() {
    console.log(this.props.amount);
    const { cart } = this.props;
    return (
      <div className='cart'>
        <Container className='cart-container'>
          <h1 className='cart-title'> Cart </h1>
          <p> ''''''''''''''''''{this.props.total} sdasd</p>
          <div className='cart-items-list-wrapper'>
            {cart.length &&
              cart.map((item) => {
                return <CartItem {...item} />;
              })}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
