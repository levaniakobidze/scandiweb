import React, { Component } from "react";
import "./CartItem.css";
import { connect } from "react-redux";
import { increaseQty, decreaseQty } from "../../redux/actions/cartActions";

class CartItem extends Component {
  constructor() {
    super();

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  increase(id) {
    this.props.increaseQty(id);
  }
  decrease(id) {
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
      gallery,
    } = this.props;

    return (
      <div className='cart-item'>
        <div className='cart-item-details'>
          <h3 className='cart-item-title'>{name}</h3>
          <p className='cartItem-brand'>{brand}</p>
          <div className='attributes-wrapper'>
            {/* //////////////////////////// */}

            {attributes &&
              attributes.map((attribute, index) => {
                if (attribute.type === "text") {
                  return (
                    <div key={index} className='attribute-wrapper'>
                      <p className='attribute-name'>{attribute.name}:</p>
                      <div className='attribute'>
                        {attribute.items.map((item, index) => {
                          return (
                            <div key={index}>
                              {" "}
                              <div
                                className={
                                  selectedAttributes.length &&
                                  selectedAttributes[0][
                                    `${attribute.name.toLowerCase()}`
                                  ] === item.value
                                    ? "cart-item-text-cont cart-item-text-cont-active"
                                    : "cart-item-text-cont"
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
                      <p className='attribute-name'>{attribute.name}:</p>
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
                                  ? "cart-item-color-cont cart-item-color-active"
                                  : "cart-item-color-cont"
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
              className='cart-item-change-amount-btn'
              onClick={() => this.increase(itemID)}>
              +
            </button>
            <span>{qty}</span>
            <button
              className='cart-item-change-amount-btn'
              onClick={() => this.decrease(itemID)}>
              -
            </button>
          </div>
          <div className='cart-item-image'>
            <img src={gallery[0]} alt={name} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart.cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQty: (id) => dispatch(increaseQty(id)),
    decreaseQty: (id) => dispatch(decreaseQty(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
