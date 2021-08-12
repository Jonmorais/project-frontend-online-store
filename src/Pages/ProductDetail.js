import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Form from '../Components/Form';
import './ProductDetail.css';

class ProductDetail extends Component {
  render() {
    const {
      location: { title,
        thumbnail,
        price,
        id,
      },
      handleChange } = this.props;
    const quantity = 1;
    return (
      <div>
        <Header />
        <div className="session">
          <p data-testid="product-detail-name">
            { title }
          </p>
          <p>
            {price}
          </p>
          <img alt={ title } src={ thumbnail } />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => handleChange({ title, thumbnail, price, id, quantity }) }
          >
            Add to cart
          </button>
          <div className="form">
            <Form />
          </div>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
}.isRequired;

export default ProductDetail;
