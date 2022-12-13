import React, {PureComponent} from "react";
import { connect } from "react-redux";
import "./OverlayItem.css";
import { increaseQty, decreaseQty } from "../../redux/Slices/cartSlice";
import TextAttributes from "../overlayItemComponents/attributes/TextAttributes";
import ColorAttributes from "../overlayItemComponents/attributes/ColorAttributes";

class OverlayItem extends PureComponent {
  constructor() {
    super();

    this.increaseQtyHandler = this.increaseQtyHandler.bind(this);
    this.decreaseQtyHandler = this.decreaseQtyHandler.bind(this);
  }

  increaseQtyHandler(id) {
    this.props.increaseQty(id);
  }
  decreaseQtyHandler(id) {
    this.props.decreaseQty(id);
  }
  render() {
    const {
      itemID,
      name,
      brand,
      attributes,
      selectedAttributes,
      qty,
      prices,
      gallery,
    } = this.props;

    return (
      <div className='overlay-cart-item'>
        <div className='overlay-cart-item-details'>
          <h3 className='overlay-cart-item-title'>{name}</h3>
          <p className='overlay-cartItem-brand'>{brand}</p>
          <span className='overlay-cartItem-price'>
            {prices[this.props.currencyIndex].currency.symbol}
            {prices[this.props.currencyIndex].amount}
          </span>
          <div className='attributes-wrapper'>
            {attributes &&
              attributes.map((attribute, attributeIndex) => {
                if (attribute.type === "text") {
                  return <TextAttributes
                  key={attributeIndex}
                  attribute={attribute}
                  selectedAttributes={selectedAttributes}
                  />
                }
                if (attribute.type === "swatch" && attribute.name === "Color") {
                  return <ColorAttributes
                      key={attributeIndex}
                      attribute={attribute}
                      selectedAttributes={selectedAttributes}
                  />;
                }
              })}
          </div>
        </div>

        <div className='overlay-cart-item-amount-images'>
          <div className='overlay-cart-item-amount'>
            <button
              className='overlay-cart-item-change-amount-btn'
              onClick={() => this.increaseQtyHandler(itemID)}>
              +
            </button>
            <span>{qty}</span>
            <button
              className='overlay-cart-item-change-amount-btn'
              onClick={() => this.decreaseQtyHandler(itemID)}>
              -
            </button>
          </div>
          <div className='overlay-cart-item-image'>
            <img src={gallery[0]} alt={name} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currencyIndex: state.product.currencyIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQty: (id) => dispatch(increaseQty(id)),
    decreaseQty: (id) => dispatch(decreaseQty(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverlayItem);
