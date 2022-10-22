import React, { Component } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import store from "../../assets/store.svg";

class Product extends Component {
  render() {
    const addToCartHandler = (item) => {
      const defaultAttributes = item.attributes.map((attribute) => {
        return {
          [attribute.name.toLowerCase()]: attribute.items[0].value,
        };
      });
      const customizedItem = {
        ...item,
        itemID: `${item.id}${Object.values(defaultAttributes)} `,
        selectedAttributes: [...defaultAttributes],
      };
      this.props.addToCart(customizedItem);
    };

    const { id, item, name, gallery, prices, currencyIndex } = this.props;
    return (
      <div className='product-wrapper'>
        <Link key={id} to={{ pathname: `/PDP/${id}`, state: { item } }}>
          <div key={id} className='list-item'>
            <div className='product-img'>
              <img src={gallery[0]} alt='item' />
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
          <img src={store} alt='' />
        </button>
      </div>
    );
  }
}

export default Product;
