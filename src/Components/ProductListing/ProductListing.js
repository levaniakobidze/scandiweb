import React, { Component } from "react";
import "./ProductListing.css";
import { gql } from "graphql-tag";
import { connect } from "react-redux";
import { setProducts } from "../../redux/actions/productActions";
import { graphql } from "react-apollo";
import { useQuery } from "react-apollo";
import { Query } from "react-apollo";
import Product from "../../Components/Product/Product";

// Fetch products //
const PRODUCTS_QUERY = gql`
  query {
    category(input: { title: "all" }) {
      products {
        id
        name
        inStock
        gallery
        description
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

class ProductListing extends Component {
  state = {
    cartBtnActive: false,
  };

  componentDidUpdate() {
    const products = this.props.data.category.products;
    products && this.props.setProducts(products);
  }

  render() {
    console.log(this.props.category);
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
            cartBtnActive={this.state.cartBtnActive}
            currencyIndex={this.props.currencyIndex}
          />
        );
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    category: state.products.category,
    currencyIndex: state.products.currencyIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(setProducts(products)),
  };
};

export default graphql(PRODUCTS_QUERY)(
  connect(mapStateToProps, mapDispatchToProps)(ProductListing)
);
