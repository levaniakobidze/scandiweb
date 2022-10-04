import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCurrencyIndex } from "../../redux/actions/productActions";
import { gql } from "graphql-tag";
import { graphql } from "react-apollo";
import "./Currency.css";

const CURRENCY_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class Currency extends Component {
  constructor() {
    super();

    this.state = {
      activeCurrency: "USD",
    };
  }

  render() {
    const currencies = this.props.data.currencies;
    return (
      <ul
        className={
          this.props.showCurrencies
            ? "currency-list currency-active"
            : "currency-list"
        }>
        {currencies &&
          currencies.map((currencie, index) => {
            return (
              <li onClick={() => this.props.changeCurrencyIndex(index)}>
                <span>{currencie.symbol} </span>
                <span>{currencie.label}</span>
              </li>
            );
          })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencyIndex: () => state.products.currencyIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrencyIndex: (index) => dispatch(changeCurrencyIndex(index)),
  };
};

export default graphql(CURRENCY_QUERY)(
  connect(mapStateToProps, mapDispatchToProps)(Currency)
);
