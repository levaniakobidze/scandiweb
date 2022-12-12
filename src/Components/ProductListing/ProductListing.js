import React, { Component } from "react";
import "./ProductListing.css";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import Product from "../../Components/Product/Product";
import {PRODUCTS_QUERY} from '../../Queries/queries'
import {setProducts} from '../../redux/Slices/productSlice'
import {addToCart} from '../../redux/Slices/cartSlice'


class ProductListing extends Component {
  componentDidUpdate() {
    const categories = this.props.data.categories;
    const products =
      categories &&
      categories.find((category) => category.name === this.props.category)
        .products;
    products && this.props.setProducts(products);
  }

  render() {
    const products = this.props.products;
    return (
      products.length &&
      products.map((item) => {
        return (
          <Product
            key={item.id}
            id={item.id}
            item={item}
            name={item.name}
            gallery={item.gallery}
            prices={item.prices}
            currencyIndex={this.props.currencyIndex}
            addToCart={this.props.addToCart}
            cart={this.cart}
            inStock={item.inStock}
          />
        );
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    category: state.product.category,
    currencyIndex: state.product.currencyIndex,
    cart: state.cart.cart,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(setProducts(products)),
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default graphql(PRODUCTS_QUERY)(
  connect(mapStateToProps, mapDispatchToProps)(ProductListing)
);
