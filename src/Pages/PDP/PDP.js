import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Container from "../../Components/Container/Container";
import { addItemID, addToCart } from "../../redux/actions/cartActions";

export class PDP extends Component {
  constructor() {
    super();
    this.state = {
      imgIndex: 0,
      color: "",
      selectedAttributes: [],
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
    let defaultAttributes = [];

    for (let i = 0; i < item.attributes.length; i++) {
      defaultAttributes = {
        ...defaultAttributes,
        [item.attributes[i].name.toLowerCase()]:
          item.attributes[i].items[0].value,
      };
    }

    let customizedItem = {
      ...item,
      selectedAttributes:
        this.state.selectedAttributes.length === 0
          ? [{ ...defaultAttributes }]
          : [{ ...this.state.selectedAttributes }],
      itemID:
        this.state.selectedAttributes.length === 0
          ? `${item.id}${Object.values(defaultAttributes)}`
          : `${item.id}${Object.values(this.state.selectedAttributes)}`,
    };

    this.props.addToCart(customizedItem);

    this.props.addItemID(
      this.state.selectedAttributes.length === 0
        ? `${item.id}${Object.values(defaultAttributes)}`
        : `${item.id}${Object.values(this.state.selectedAttributes)}`
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedAttributes != this.state.selectedAttributes) {
      const item = this.props.location.state.item;
      let defaultAttributes = [];
      for (let i = 0; i < item.attributes.length; i++) {
        defaultAttributes = {
          ...defaultAttributes,
          [item.attributes[i].name.toLowerCase()]:
            item.attributes[i].items[0].value,
        };
      }
      this.props.addItemID(
        this.state.selectedAttributes.length === 0
          ? `${item.id}${Object.values(defaultAttributes)}`
          : `${item.id}${Object.values(this.state.selectedAttributes)}`
      );
    }
  }

  changeColor(color) {
    this.setState({
      color: color,
    });
  }
  handleAttributeClick(attrItem, attribute, id) {
    const item = this.props.location.state.item;

    let defaultAttributes = [];
    for (let i = 0; i < item.attributes.length; i++) {
      defaultAttributes = {
        ...defaultAttributes,
        [item.attributes[i].name.toLowerCase()]:
          item.attributes[i].items[0].value,
      };
    }
    attrItem = { ...attrItem, active: true };

    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attribute.name.toLowerCase()]: attrItem.value,
      },
    });
    this.props.addItemID(
      `${item.id}${Object.values(this.state.selectedAttributes)}`
    );
  }

  render() {
    const { id, name, gallery, description, brand, prices, attributes } =
      this.props.location.state.item;
    const RenderHTML = () => {
      return <div dangerouslySetInnerHTML={{ __html: description }} />;
    };

    console.log(RenderHTML());

    return (
      <section className='PDP'>
        <Container className='PDP-container'>
          <div className='gallery_wrapper'>
            <div className='small_images'>
              {gallery &&
                gallery.map((image, index) => {
                  return (
                    <div
                      key={index}
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
              attributes.map((attribute, index) => {
                if (attribute.type === "text") {
                  return (
                    <div className='attribute-wrapper' key={index}>
                      <p className='attribute-name'>{attribute.name}:</p>
                      <div className='attribute'>
                        {attribute.items.map((attrItem, index) => {
                          return (
                            <div key={index}>
                              {" "}
                              <div
                                className={
                                  this.state.selectedAttributes[
                                    `${attribute.name.toLowerCase()}`
                                  ] === attrItem.value
                                    ? "text-cont text-cont-active"
                                    : "text-cont"
                                }
                                onClick={() =>
                                  this.handleAttributeClick(
                                    attrItem,
                                    attribute,
                                    id
                                  )
                                }>
                                {attrItem.displayValue}
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
                    <div className='attribute-wrapper' key={index}>
                      <p className='attribute-name'>{attribute.name}:</p>
                      <div className='attribute'>
                        {attribute.items.map((attrItem, index) => {
                          return (
                            <div
                              key={index}
                              style={{ background: attrItem.value }}
                              className={
                                this.state.selectedAttributes[
                                  `${attribute.name.toLowerCase()}`
                                ] === attrItem.value
                                  ? "color-cont color-active"
                                  : "color-cont"
                              }
                              onClick={() =>
                                this.handleAttributeClick(attrItem, attribute)
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
                (cartItem) => cartItem.itemID === this.props.itemID
              )
                ? "REMOVE FROM CART"
                : "ADD TO CART"}
            </button>
            <p className='product-description'>{RenderHTML()}</p>
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
    itemID: state.cart.itemID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    addItemID: (id) => dispatch(addItemID(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDP));
