import React, { Component } from "react";
import { connect } from "react-redux";
import "./OverlayItem.css";
import { increaseQty, decreaseQty } from "../../redux/actions/cartActions";
class OverlayItem extends Component {
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
        <div className='cart-item-details'>
          <h3 className='overlay-cart-item-title'>{name}</h3>
          <p className='overlay-cartItem-brand'>{brand}</p>
          <span className='overlay-cartItem-price'>
            {prices[this.props.currencyIndex].currency.symbol}
            {prices[this.props.currencyIndex].amount}
          </span>
          <div className='attributes-wrapper'>
            {/* //////////////////////////// */}

            {attributes &&
              attributes.map((attribute, attributeIndex) => {
                if (attribute.type === "text") {
                  return (
                    <div key={attributeIndex} className='attribute-wrapper'>
                      <p className='overlay-attribute-name'>
                        {attribute.name}:
                      </p>
                      <div className='attribute'>
                        {attribute.items.map((item, itemIndex) => {
                          return (
                            <div key={itemIndex}>
                              {" "}
                              <div
                                className={
                                  selectedAttributes[0][
                                    `${attribute.name.toLowerCase()}`
                                  ] != undefined &&
                                  selectedAttributes[0][
                                    `${attribute.name.toLowerCase()}`
                                  ] === item.value
                                    ? "overlay-cart-item-text-cont overlay-cart-item-text-cont-active "
                                    : "overlay-cart-item-text-cont"
                                }>
                                {item.displayValue}
                              </div>{" "}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                if (attribute.type === "swatch" && attribute.name === "Color") {
                  return (
                    <div className='attribute-wrapper'>
                      <p className='overlay-attribute-name'>
                        {attribute.name}:
                      </p>
                      <div className='attribute'>
                        {attribute.items.map((item, index) => {
                          return (
                            <div
                              key={index}
                              style={{ background: item.value }}
                              className={
                                selectedAttributes[0][
                                  `${attribute.name.toLowerCase()}`
                                ] != undefined &&
                                selectedAttributes[0][
                                  `${attribute.name.toLowerCase()}`
                                ] === item.value
                                  ? "overlay-cart-item-color-cont cart-item-color-active"
                                  : "overlay-cart-item-color-cont"
                              }></div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}

            {/* ///////////////////////////////////// */}
          </div>
        </div>
        <div className='cart-item-amount-images'>
          <div className='cart-item-amount'>
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
    currencyIndex: state.products.currencyIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQty: (id) => dispatch(increaseQty(id)),
    decreaseQty: (id) => dispatch(decreaseQty(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverlayItem);
