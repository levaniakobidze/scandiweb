import React, { PureComponent } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Container from "../../Components/Container/Container";
import { addItemId, addToCart } from "../../redux/Slices/cartSlice";
import {createDefaultAttributes, createIdforPdp} from "../../Helpers/helpers";
import parse from 'html-react-parser'
import ColorAttributes from "../../Components/PDPattributes/ColorAttributes";
import TextAttributes from "../../Components/PDPattributes/TextAttributes";

export class PDP extends PureComponent {
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
    let defaultAttributes = createDefaultAttributes(item)
    let customizedItem = {
      ...item,
      selectedAttributes:
        this.state.selectedAttributes.length === 0
          ? [{ ...defaultAttributes }]
          : [{ ...this.state.selectedAttributes }],
      itemID:createIdforPdp(this.state,item,defaultAttributes),
    };
    this.props.addToCart(customizedItem);
    this.props.addItemID(createIdforPdp(this.state,item,defaultAttributes))
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedAttributes !== this.state.selectedAttributes) {
      const item = this.props.location.state.item;
      let defaultAttributes = createDefaultAttributes(item)
      this.props.addItemID(createIdforPdp(this.state,item,defaultAttributes));
    }
  }

  componentDidMount() {
    const item = this.props.location.state.item;
    let defaultAttributes = createDefaultAttributes(item)
    this.props.addItemID(`${item.id}${Object.values(defaultAttributes)}`);
  }

  changeColor(color) {
    this.setState({
      color: color,
    });
  }
  handleAttributeClick(attrItem, attribute, id) {
    const item = this.props.location.state.item;
    attrItem = { ...attrItem, active: true };
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attribute.name.toLowerCase()]: attrItem.value,
      },
    });
    this.props.addItemID(`${item.id}${Object.values(this.state.selectedAttributes)}`);
  }

  render() {
    const { id, name, gallery, description, brand, prices, attributes,inStock } =
      this.props.location.state.item;
    const renderButtonText = () => {
       return this.props.cart.find(
            (cartItem) => cartItem.itemID === this.props.itemID
        ) ? "REMOVE FROM CART"
           : "ADD TO CART"
    }
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
                      <img src={image} alt={id} />{" "}
                    </div>
                  );
                })}
            </div>
            <div className='big_image'>
              <img src={gallery[this.state.imgIndex]} alt='' />
              <p
                  className={
                    inStock
                        ? "out-of-stock-text"
                        : "out-of-stock-text out-of-stock-text-active"
                  }>
                OUT OF STOCK
              </p>
            </div>
          </div>
          <div className='description'>
            <h1 className='brand'>{brand}</h1>
            <p className='product-title'>{name}</p>
            {attributes &&
              attributes.map((attribute, index) => {
                if (attribute.type === "text") {
                  return <TextAttributes
                  key={index}
                  attribute={attribute}
                  selectedAttributes={this.state.selectedAttributes}
                  handleAttributeClick={this.handleAttributeClick}
                  id={id}
                  />
                }
                if (attribute.type === "swatch" && attribute.name === "Color") {
                  return  <ColorAttributes
                  key={index}
                  attribute={attribute}
                  handleAttributeClick={this.handleAttributeClick}
                  selectedAttributes={this.state.selectedAttributes}
                  />
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
                disabled={!inStock}
              className='PDP-add-to-cart'
              onClick={() =>
                this.addToCartHandler(this.props.location.state.item)
              }>
              {renderButtonText()}
            </button>
            {parse(description)}
          </div>
        </Container>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    currencyIndex: state.product.currencyIndex,
    cart: state.cart.cart,
    itemID: state.cart.itemID,


  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    addItemID: (id) => dispatch(addItemId(id)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDP));
