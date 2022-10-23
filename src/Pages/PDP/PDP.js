import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Container from "../../Components/Container/Container";
import { addToCart } from "../../redux/actions/cartActions";

export class PDP extends Component {
  constructor() {
    super();
    this.state = {
      imgIndex: 0,
      color: "",
      selectedAttributes: [],
      itemID: "",
    };
    this.changeImgIndex = this.changeImgIndex.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleAttributeClick = this.handleAttributeClick.bind(this);
  }

  changeImgIndex(index) {
    this.setState({
      imgIndex: index,
    });
  }

  addToCartHandler(item) {
    const defaultAttributes = item.attributes.map((attribute) => {
      return {
        [attribute.name.toLowerCase()]: attribute.items[0].value,
      };
    });
    let customizedItem = {
      ...item,
      selectedAttributes:
        this.state.selectedAttributes.length === 0
          ? [...defaultAttributes]
          : [{ ...this.state.selectedAttributes }],
      itemID:
        this.state.selectedAttributes.length === 0
          ? `${item.id}${Object.values(defaultAttributes[0])}`
          : `${item.id}${Object.values(this.state.selectedAttributes)}`,
    };

    this.props.addToCart(customizedItem);
    console.log(customizedItem.itemID);
  }

  changeColor(color) {
    this.setState({
      color: color,
    });
  }
  handleAttributeClick(item, attribute, id) {
    this.setState(
      {
        selectedAttributes: {
          ...this.state.selectedAttributes,
          [attribute.name.toLowerCase()]: item.value,
        },
        itemID: `${id}${Object.values(this.state.selectedAttributes)}`,
      },
      function () {
        this.setState({
          itemID: `${id}${Object.values(this.state.selectedAttributes)}`,
        });
      }
    );
  }
  componentDidMount() {
    this.changeColor();
    const defaultAttributes = this.props.location.state.item.attributes.map(
      (attribute) => {
        return {
          [attribute.name.toLowerCase()]: attribute.items[0].value,
        };
      }
    );
    this.setState({
      itemID: `${this.props.location.state.item.id}${Object.values(
        defaultAttributes[0]
      )}`,
    });
  }

  render() {
    const { id, name, gallery, description, brand, prices, attributes } =
      this.props.location.state.item;
    const desc = new DOMParser().parseFromString(description, "text/xml")
      .firstChild.innerHTML;

    return (
      <section className='PDP'>
        <Container className='PDP-container'>
          <div className='gallery_wrapper'>
            <div className='small_images'>
              {gallery &&
                gallery.map((image, index) => {
                  return (
                    <div
                      className='small_img'
                      onClick={() => this.changeImgIndex(index)}>
                      {" "}
                      <img src={image} alt={id} />{" "}
                    </div>
                  );
                })}
            </div>
            <div className='big_image'>
              <img src={gallery[this.state.imgIndex]} alt='' />
            </div>
          </div>

          <div className='description'>
            <h1 className='brand'>{brand}</h1>
            <p className='product-title'>{name}</p>
            {attributes &&
              attributes.map((attribute) => {
                if (attribute.type === "text") {
                  return (
                    <div className='attribute-wrapper'>
                      <p className='attribute-name'>{attribute.name}:</p>
                      <div className='attribute'>
                        {attribute.items.map((item) => {
                          return (
                            <div>
                              {" "}
                              <div
                                className={
                                  this.state.selectedAttributes[
                                    `${attribute.name.toLowerCase()}`
                                  ] === item.value
                                    ? "text-cont text-cont-active"
                                    : "text-cont"
                                }
                                onClick={() =>
                                  this.handleAttributeClick(item, attribute, id)
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
                        {attribute.items.map((item) => {
                          return (
                            <div
                              style={{ background: item.value }}
                              className={
                                this.state.selectedAttributes[
                                  `${attribute.name.toLowerCase()}`
                                ] === item.value
                                  ? "color-cont color-active"
                                  : "color-cont"
                              }
                              onClick={() =>
                                this.handleAttributeClick(item, attribute)
                              }></div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            <p className='PDP-price'>
              Price
              <span>
                {prices[this.props.currencyIndex].currency.symbol}
                {prices[this.props.currencyIndex].amount}
              </span>
            </p>

            <button
              className='PDP-add-to-cart'
              onClick={() =>
                this.addToCartHandler(this.props.location.state.item)
              }>
              {this.props.cart.find(
                (cartItem) => cartItem.itemID === this.state.itemID
              )
                ? "REMOVE FROM CART"
                : "ADD TO CART"}
            </button>
            <p className='product-description'>{desc}</p>
          </div>
        </Container>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    currencyIndex: state.products.currencyIndex,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDP));
