import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { gql } from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

export class PDP extends Component {
  componentDidMount() {
    const { id, name } = this.props.location.state.item;
  }

  render() {
    const { id, name } = this.props.location.state.item;

    console.log(this.props);

    return <div>{name}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default withRouter(connect(mapStateToProps)(PDP));
