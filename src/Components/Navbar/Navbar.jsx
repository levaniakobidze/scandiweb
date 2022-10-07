import React, { Component } from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import DropDown from "../../assets/DropDown.svg";
import Cart from "../../assets/Cart.svg";
import { connect } from "react-redux";
import { changeCategory } from "../../redux/actions/productActions";
import Currency from "../Currency/Currency";
import { graphql } from "react-apollo";
import { gql } from "graphql-tag";
import { Link } from "react-router-dom";
import CartOverlay from "../cartOverlay/CartOverlay";
import Container from "../Container/Container";
import {
  openCartOverlay,
  closeCartOverlay,
} from "../../redux/actions/cartActions";

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
      activeCurrency: "$",
    };
    this.showCurrencyHandler = this.showCurrencyHandler.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
  }
  showCurrencyHandler() {
    this.setState({
      showCurrencies: !this.state.showCurrencies,
    });
  }
  changeCurrency(symbol) {
    this.setState({
      activeCurrency: symbol,
    });
  }
  toggleCartOverlay() {
    if (!this.props.showCartOverlay) {
      this.props.openCartOverlay();
    } else this.props.closeCartOverlay();
  }

  render() {
    const categories = this.props.data.categories;
    return (
      <nav className='nav'>
        <Container className='nav-container'>
          <ul className='categories-nav'>
            {categories &&
              categories.map((category) => {
                return (
                  <Link
                    to='/'
                    className={
                      this.props.category === category.name ? "active-nav" : ""
                    }
                    onClick={() => this.props.changeCategory(category.name)}>
                    {category.name}
                  </Link>
                );
              })}
          </ul>
          <img src={Logo} alt='logo' className='logo' />

          <div className='currency-and-cart'>
            <div className='currency' onClick={this.showCurrencyHandler}>
              <div className='currency-symbol'>{this.state.activeCurrency}</div>
              <div className='currency-dropdown'>
                <img
                  className={this.state.showCurrencies && "dropdown-active"}
                  src={DropDown}
                  alt='drop'
                />
              </div>
            </div>
            <div className='cart' onClick={this.toggleCartOverlay}>
              <img src={Cart} alt='cart' className='cart-btn' />
            </div>
          </div>
          <Currency
            showCurrencies={this.state.showCurrencies}
            activeCurrency={this.state.activeCurrency}
            changeCurrency={this.changeCurrency}
            setState={this.setState()}
            showCurrencyHandler={this.showCurrencyHandler}
          />
        </Container>
        {this.props.showCartOverlay && <CartOverlay />}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    category: state.products.category,
    showCartOverlay: state.cart.showCartOverlay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (name) => dispatch(changeCategory(name)),
    openCartOverlay: () => dispatch(openCartOverlay()),
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default graphql(CATEGORY_QUERY)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
