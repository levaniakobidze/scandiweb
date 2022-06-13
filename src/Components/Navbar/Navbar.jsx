import React, { Component } from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import DropDown from "../../assets/DropDown.svg";
import Cart from "../../assets/Cart.svg";
import { connect } from "react-redux";
import { changeCategoryIndex } from "../../redux/actions/productActions";

class Navbar extends Component {
  render() {
    return (
      <nav className='nav'>
        <ul className='categories-nav'>
          <li
            className={this.props.categoryIndex == 0 ? "active-nav" : ""}
            onClick={() => this.props.changeCategoryIndex(0)}>
            All
          </li>
          <li
            className={this.props.categoryIndex == 1 ? "active-nav" : ""}
            onClick={() => this.props.changeCategoryIndex(1)}>
            Clothes
          </li>
          <li
            className={this.props.categoryIndex == 2 ? "active-nav" : ""}
            onClick={() => this.props.changeCategoryIndex(2)}>
            Tech
          </li>
        </ul>
        <img src={Logo} alt='logo' className='logo' />

        <div className='currency-and-cart'>
          <div className='currency'>
            $
            <img className='currency-dropdown' src={DropDown} alt='drop' />
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
    changeCategoryIndex: (products) => dispatch(changeCategoryIndex(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
