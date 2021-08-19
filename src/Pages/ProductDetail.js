import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Form from '../Components/Form';

import './ProductDetail.css';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      quantidade: 0,
    };
    this.getQuantity = this.getQuantity.bind(this);
  }

  componentDidMount() {
    this.getQuantity();
  }

  getQuantity() {
    const quantidade = Number(localStorage.getItem('quantidade'));
    this.setState({ quantidade });
  }

  render() {
    const {
      location: { title,
        thumbnail,
        price,
        id,
        available,
        shipping,
      },
      handleChange } = this.props;
    const { quantidade } = this.state;
    const quantity = 1;
    return (
      <div>
        <Header quantidade={ quantidade } />

        <div className="session">
          <p data-testid="product-detail-name">
            { title }
          </p>
          <p>
            {price}
          </p>
          {
            shipping.free_shipping
              ? <p data-testid="free-shipping">Frete Grátis</p>
              : <p>Sem frete grátis</p>
          }
          <img alt={ title } src={ thumbnail } />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              handleChange({ title, thumbnail, price, id, quantity, available });
              this.getQuantity();
            } }
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
