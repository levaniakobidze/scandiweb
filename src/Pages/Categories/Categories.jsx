import React, { Component } from "react";
import "./Categories.css";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "graphql-tag";
import CircleCart from "../../assets/CircleCart.svg";
import { connect } from "react-redux";
import ProductListing from "../../Components/ProductListing/ProductListing";
import { setProducts } from "../../redux/actions/productActions";

import { graphql } from "react-apollo";

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
class Categories extends Component {
  state = {
    cartBtnActive: false,
  };

  componentWillMount() {
    this.props.data.categories &&
      this.props.setProducts(this.props.data.categories);
  }

  render() {
    console.log(this.props);
    return (
      <div className='App'>
        {/* <section className='categories'>
          <h1 className='categories-title'> Category name</h1>
          <div className='categories-products-list'>
            {products &&
              products.map((item) => {
                return (
                  <div key={item.id} className='list-item'>
                    <img
                      className='product-img'
                      src={item.gallery[0]}
                      alt='item'
                    />
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
                );
              })}
          </div>
        </section>
        ); */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(setProducts(products)),
  };
};

export default graphql(PRODUCTS_QUERY)(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
);
