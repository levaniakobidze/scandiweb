import React, { Component } from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import DropDown from "../../assets/DropDown.svg";
import Cart from "../../assets/Cart.svg";
import { connect } from "react-redux";
import {
  changeCategory,
  changeCurrencyIndex,
} from "../../redux/actions/productActions";
import Currency from "../Currency/Currency";
import { graphql } from "react-apollo";
import { gql } from "graphql-tag";

// Fetch categories //

const CATEGORY_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      showCurrencies: false,
    };
    this.showCurrencyHandler = this.showCurrencyHandler.bind(this);
  }
  showCurrencyHandler() {
    this.setState({
      showCurrencies: !this.state.showCurrencies,
    });
  }

  render() {
    const categories = this.props.data.categories;
    return (
      <nav className='nav'>
        <ul className='categories-nav'>
          {categories &&
            categories.map((category, index) => {
              return (
                <li
                  className={
                    this.props.categoryIndex === index ? "active-nav" : ""
                  }
                  onClick={() => this.props.changeCategoryIndex(category.name)}>
                  {category.name}
                </li>
              );
            })}
        </ul>
        <img src={Logo} alt='logo' className='logo' />

        <div className='currency-and-cart'>
          <div className='currency' onClick={this.showCurrencyHandler}>
            $
            <div className='currency-dropdown'>
              <img
                className={this.state.showCurrencies && "dropdown-active"}
                src={DropDown}
                alt='drop'
              />
              <Currency showCurrencies={this.state.showCurrencies} />
            </div>
          </div>
          <div className='cart'>
            <img src={Cart} alt='cart' className='cart-btn' />
          </div>
        </div>
      </nav>
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
    changeCategory: (categoryName) => dispatch(changeCategory(categoryName)),
    changeCurrencyIndex: (index) => dispatch(changeCurrencyIndex(index)),
  };
};

export default graphql(CATEGORY_QUERY)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
