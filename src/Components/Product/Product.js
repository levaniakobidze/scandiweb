import React, { Component } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import store from "../../assets/store.svg";
import { connect } from "react-redux";

class Product extends Component {
  render() {
    const addToCartHandler = (item) => {
      let defaultAttributes = [];
      for (let i = 0; i < item.attributes.length; i++) {
        defaultAttributes = {
          ...defaultAttributes,
          [item.attributes[i].name.toLowerCase()]:
            item.attributes[i].items[0].value,
        };
      }
      const customizedItem = {
        ...item,
        itemID: `${item.id}${Object.values(defaultAttributes)}`,
        selectedAttributes: [{ ...defaultAttributes }],
      };
      this.props.addToCart(customizedItem);
    };

    const { id, item, name, gallery, prices, currencyIndex, inStock } =
      this.props;
    return (
      <div className='product-wrapper'>
        <Link key={id} to={{ pathname: `/PDP/${id}`, state: { item } }}>
          <div key={id} className='list-item'>
            <div
              className={inStock ? "product-img" : "product-img out-of-stock"}>
              <img src={gallery[0]} alt='item' />
              <p
                className={
                  inStock
                    ? "out-of-stock-text"
                    : "out-of-stock-text out-of-stock-text-active"
                }>
                OUT OF STOCK
              </p>
            </div>

            <p>{name}</p>
            <span>
              {prices[currencyIndex].currency.symbol}
              {prices[currencyIndex].amount}
            </span>
          </div>
        </Link>
        <button
          className={"addToCart-btn"}
          onClick={() => addToCartHandler(item)}>
          {!this.props.cart.find((cartItem) => cartItem.id === item.id) ? (
            <img src={store} alt='' />
          ) : (
            "X"
          )}
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Product);
