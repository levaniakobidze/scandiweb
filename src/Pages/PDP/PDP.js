import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { gql } from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

export class PDP extends Component {
  render() {
    const { id, name, gallery, description } = this.props.location.state.item;
    const { item } = this.props.location.state;

    console.log(item);

    return (
      <section className='PDP'>
        <h1>{name}</h1>
        <img src={gallery[0]} alt='' />
        <img src={gallery[1]} alt='' />
        <img src={gallery[2]} alt='' />
        {description}
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default withRouter(connect(mapStateToProps)(PDP));
