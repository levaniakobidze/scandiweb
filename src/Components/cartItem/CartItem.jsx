import React, { Component } from "react";
import "./CartItem.css";
import { connect } from "react-redux";
import { increaseQty, decreaseQty } from "../../redux/actions/cartActions";

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      cartImgIndex: 0,
    };
    this.increaseQtyHandler = this.increaseQtyHandler.bind(this);
    this.decreaseQtyHandler = this.decreaseQtyHandler.bind(this);
    this.increaseImgIndex = this.increaseImgIndex.bind(this);
    this.decreaseImgIndex = this.decreaseImgIndex.bind(this);
  }
  increaseQtyHandler(id) {
    this.props.increaseQty(id);
  }
  decreaseQtyHandler(id) {
    this.props.decreaseQty(id);
  }
  increaseImgIndex(gallery) {
    if (gallery.length - 2 >= this.state.cartImgIndex) {
      this.setState({
        cartImgIndex: this.state.cartImgIndex + 1,
      });
    }
  }
  decreaseImgIndex() {
    if (this.state.cartImgIndex != 0) {
      this.setState({
        cartImgIndex: this.state.cartImgIndex - 1,
      });
    }
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
      <div className='cart-item'>
        <div className='cart-item-details'>
          <h3 className='cart-item-title'>{name}</h3>
          <p className='cartItem-brand'>{brand}</p>
          <span className='cartItem-price'>
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
                      <p className='attribute-name'>{attribute.name}:</p>
                      <div className='attribute'>
                        {attribute.items.map((item, itemIndex) => {
                          return (
                            <div key={itemIndex}>
                              {" "}
                              <div
                                // className={"cart-item-text-cont-active"}

                                className={
                                  selectedAttributes[0][
                                    `${attribute.name.toLowerCase()}`
                                  ] != undefined &&
                                  selectedAttributes[0][
                                    `${attribute.name.toLowerCase()}`
                                  ] === item.value
                                    ? "  cart-item-text-cont-active "
                                    : " cart-item-text-cont"
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
              onClick={() => this.increaseQtyHandler(itemID)}>
              +
            </button>
            <span>{qty}</span>
            <button
              className='cart-item-change-amount-btn'
              onClick={() => this.decreaseQtyHandler(itemID)}>
              -
            </button>
          </div>
          <div className='cart-item-image'>
            <img src={gallery[this.state.cartImgIndex]} alt={name} />
            {gallery.length > 1 && (
              <div className='image-buttons'>
                <button onClick={() => this.decreaseImgIndex(gallery)}>
                  {"<"}
                </button>
                <button onClick={() => this.increaseImgIndex(gallery)}>
                  {">"}
                </button>
              </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
