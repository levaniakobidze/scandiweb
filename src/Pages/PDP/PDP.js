import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Container from "../../Components/Container/Container";

export class PDP extends Component {
  constructor() {
    super();
    this.state = {
      imgIndex: 0,
      color: "",
      capacity: "",
      size: "",
    };
    this.changeImgIndex = this.changeImgIndex.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  changeImgIndex(index) {
    this.setState({
      imgIndex: index,
    });
  }
  addToCartHandler(item) {
    console.log(item);
  }

  changeColor(color) {
    this.setState({
      color: color,
    });
  }
  componentDidMount() {
    this.changeColor();
  }

  render() {
    const { id, name, gallery, description, brand, prices, attributes } =
      this.props.location.state.item;
    const desc = new DOMParser().parseFromString(description, "text/xml")
      .firstChild.innerHTML;
    const colors = attributes.find((attribute) => attribute.name === "Color");
    const sizes = attributes.find((attribute) => attribute.name === "Size");
    const capacities = attributes.find(
      (attribute) => attribute.name === "Capacity"
    );

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
            <div className='PDP-capacities'>
              {capacities &&
                capacities.items.map((capacitie) => {
                  return (
                    <div className='capacity-cont'>
                      {capacitie.displayValue}
                    </div>
                  );
                })}
            </div>
            <div className='PDP-sizes'>
              {sizes &&
                sizes.items.map((size) => {
                  return <div className='size-cont'>{size.displayValue}</div>;
                })}
            </div>
            <div className='PDP-colors'>
              {colors &&
                colors.items.map((color) => {
                  return (
                    <div
                      style={{ background: color.value }}
                      className={
                        this.state.color === color.value
                          ? "color-cont color-active"
                          : "color-cont"
                      }
                      onClick={() => this.changeColor(color.value)}></div>
                  );
                })}
            </div>
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
              ADD TO CART
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
  };
};

export default withRouter(connect(mapStateToProps)(PDP));
