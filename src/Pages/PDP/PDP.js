import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

export class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return <div>PDP</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapStateToProps)(PDP);
