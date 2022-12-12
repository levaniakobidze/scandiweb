import React, {PureComponent} from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import store from "../../assets/store.svg";
import { connect } from "react-redux";
import { addItemId } from "../../redux/Slices/cartSlice";
import {createDefaultAttributes,createIdforProduct} from "../../Helpers/helpers";

class Product extends PureComponent {
  render() {
    const addToCartHandler = (item) => {
        let defaultAttributes = createDefaultAttributes(item);
      const customizedItem = {
        ...item,
        itemID: `${item.id}${Object.values(defaultAttributes)}`,
        selectedAttributes: [{ ...defaultAttributes }],
      };
      this.props.addToCart(customizedItem);
      this.props.addItemID(createIdforProduct(customizedItem,item,defaultAttributes));
    };
    const { id, item, name, gallery, prices, currencyIndex, inStock } =
      this.props;
    return (
      <div className='product-wrapper'>
        <Link key={id} to={{ pathname: `/PDP/${id}`, state: { item} }}>
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
            disabled={!inStock}
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
    itemID: state.itemID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemID: (id) => dispatch(addItemId(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
