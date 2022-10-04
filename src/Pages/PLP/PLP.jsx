import React, { Component } from "react";
import "./PLP.css";
import ProductListing from "../../Components/ProductListing/ProductListing";

class Categories extends Component {
  state = {
    cartBtnActive: false,
  };

  render() {
    return (
      <div className='App'>
        <section className='categories'>
          <h1 className='categories-title'> Category name</h1>
          <div className='products-list'>
            <ProductListing />
          </div>
        </section>
      </div>
    );
  }
}

export default Categories;
