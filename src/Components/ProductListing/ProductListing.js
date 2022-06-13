import React, { Component } from "react";
import "./ProductListing.css";
import { gql } from "graphql-tag";
import CircleCart from "../../assets/CircleCart.svg";
import { connect } from "react-redux";
import { setProducts } from "../../redux/actions/productActions";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

const PRODUCTS_QUERY = gql`
  query {
    categories {
      name
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
    const products = this.props.data.categories
      ? this.props.data.categories[this.props.categoryIndex].products
      : [];
    products && this.props.setProducts(products);
  }

  render() {
    const products = this.props.products;
    return (
      products.length &&
      products.map((item) => {
        return (
          <Link key={item.id} to={"/PDP"} state={[2, 3, 4]}>
            <div key={item.id} className='list-item'>
              <img className='product-img' src={item.gallery[0]} alt='item' />
              <img
                className={
                  this.state.cartBtnActive
                    ? "addToCart-btn addToCart-btn-active"
                    : "addToCart-btn"
                }
                src={CircleCart}
                alt=''
              />

              <p>{item.name}</p>
              <span>
                {item.prices[0].currency.symbol}
                {item.prices[0].amount}
              </span>
            </div>
          </Link>
        );
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    categoryIndex: state.products.changeCategoryIndex,
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
