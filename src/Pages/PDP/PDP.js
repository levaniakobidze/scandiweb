import React, { Component } from "react";
import "./PDP.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { gql } from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

export class PDP extends Component {
  constructor() {
    super();
    this.state = {
      imgIndex: 0,
    };
    this.changeImgIndex = this.changeImgIndex.bind(this);
  }

  changeImgIndex(index) {
    this.setState({
      imgIndex: index,
    });
    console.log(this.state.imgIndex);
  }

  render() {
    const { id, name, gallery, description } = this.props.location.state.item;

    return (
      <section className='PDP'>
        <div className='gallery_wrapper'>
          <div className='small_images'>
            <div className='small_img' onClick={() => this.changeImgIndex(0)}>
              {" "}
              <img src={gallery[0]} alt={id} />{" "}
            </div>
            <div className='small_img' onClick={() => this.changeImgIndex(1)}>
              {" "}
              <img src={gallery[2]} alt={id} />{" "}
            </div>
            <div className='small_img' onClick={() => this.changeImgIndex(2)}>
              {" "}
              <img src={gallery[3]} alt={id} />{" "}
            </div>
          </div>
          <div className='big_image'>
            <img src={gallery[this.state.imgIndex]} alt='' />
          </div>
        </div>
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
