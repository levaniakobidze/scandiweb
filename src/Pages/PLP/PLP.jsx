import React, { Component } from "react";
import "./PLP.css";
import ProductListing from "../../Components/ProductListing/ProductListing";
import { connect } from "react-redux";
import Container from "../../Components/Container/Container";
class Categories extends Component {
  state = {
    cartBtnActive: false,
  };

  render() {
    return (
      <section className='PLP'>
        <Container className='PLP-container'>
          <h1 className='categories-title'>
            {this.props.category.toUpperCase()}
          </h1>
          <div className='products-list'>
            <ProductListing />
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.product.category,

  };
};

export default connect(mapStateToProps)(Categories);
