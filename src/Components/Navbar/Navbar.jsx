import React, { Component } from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo.svg";
import DropDown from "../../assets/DropDown.svg";
import Cart from "../../assets/Cart.svg";

export default class Navbar extends Component {
  render() {
    return (
      <nav className='nav'>
        <ul className='categories-nav'>
          <li>All</li>
          <li>Clothes</li>
          <li>Tech</li>
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
