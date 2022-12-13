import React, {PureComponent} from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import DropDown from "../../assets/DropDown.svg";
import Cart from "../../assets/Cart.svg";
import { connect } from "react-redux";
import { changeCategory } from "../../redux/Slices/productSlice";
import Currency from "../Currency/Currency";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import CartOverlay from "../cartOverlay/CartOverlay";
import Container from "../Container/Container";
import {
  openCartOverlay,
  closeCartOverlay,
} from "../../redux/Slices/cartSlice";
import {CATEGORY_QUERY} from '../../Queries/queries'

class Navbar extends PureComponent {
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
              categories.map((category, index) => {
                return (
                  <Link
                    key={index}
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
          <Link to={'/'}>
            <img src={Logo} alt='logo' className='logo'  onClick={() => this.props.changeCategory('all')} />
          </Link>
          <div className='currency-and-cart'>
            <div className='currency' onClick={this.showCurrencyHandler}>
              <div className='currency-symbol'>{this.state.activeCurrency}</div>
              <div className='currency-dropdown'>
                <img
                  className={this.state.showCurrencies ? "dropdown-active" : ""}
                  src={DropDown}
                  alt='drop'
                />
              </div>
            </div>
            <div className='cart' onClick={this.toggleCartOverlay}>
              <img src={Cart} alt='cart' className='cart-btn' />
              {this.props.amount >= 1 &&<span className='item-qty'>{this.props.amount}</span>}
            </div>
          </div>
          <Currency
            showCurrencies={this.state.showCurrencies}
            activeCurrency={this.state.activeCurrency}
            changeCurrency={this.changeCurrency}
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
    products: state.product.products,
    category: state.product.category,
    showCartOverlay: state.cart.showCartOverlay,
    amount: state.cart.amount,
    currencyIndex: state.product.currencyIndex,
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
