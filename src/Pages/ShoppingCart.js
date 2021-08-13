import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends Component {
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
    const { products, handleQuantityDecrease, handleQuantityIncrease } = this.props;
    if (Object.keys(products).length === 0) {
      return (
        <>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          <Link to="/">Back</Link>
        </>
      );
    }
    const { quantidade } = this.state;

    return (
      <div className="session">
        <p data-testid="shopping-cart-size">{ quantidade }</p>
        {
          Object.keys(products).map((id) => (
            <div key={ products[id].id }>
              <img alt={ products[id].title } src={ products[id].thumbnail } />
              <p data-testid="shopping-cart-product-name">{ products[id].title }</p>
              <p>{ products[id].price }</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => handleQuantityDecrease(id) }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                { products[id].quantity }
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => handleQuantityIncrease(id) }
              >
                +
              </button>
            </div>
          ))
        }
        <Link to="/finish-buy">
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finish buy
          </button>
        </Link>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default ShoppingCart;
