import React, { Component } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import CircleCart from "../../assets/CircleCart.svg";

export default class Product extends Component {
  render() {
    const { id, item, name, gallery, prices, cartBtnActive, currencyIndex } =
      this.props;
    return (
      <Link key={id} to={{ pathname: `/PDP/${id}`, state: { item } }}>
        <div key={id} className='list-item'>
          <img className='product-img' src={gallery[0]} alt='item' />
          <img
            className={
              cartBtnActive
                ? "addToCart-btn addToCart-btn-active"
                : "addToCart-btn"
            }
            src={CircleCart}
            alt=''
          />

          <p>{name}</p>
          <span>
            {prices[currencyIndex].currency.symbol}
            {prices[currencyIndex].amount}
          </span>
        </div>
      </Link>
    );
  }
}
