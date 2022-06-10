import React, { Component } from "react";
import "./Categories.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "graphql-tag";
import CircleCart from "../../assets/CircleCart.svg";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

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

export default class Categories extends Component {
  state = {
    cartBtnActive: false,
    allProducts: [],
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <Query query={PRODUCTS_QUERY}>
            {({ data, loading }) => {
              if (loading) return "LOADING ..";

              const allProducts = data.categories[0].products;
              console.log(allProducts);

              return (
                <section className='categories'>
                  <h1 className='categories-title'> Category name</h1>
                  <div className='categories-products-list'>
                    {allProducts.map((item) => {
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
              );
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}
