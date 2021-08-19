import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';
import Header from '../Components/Header';

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
      <>
        <Header quantidade={ quantidade } />
        <div className="cartArea">
          {
            Object.keys(products).map((id) => (
              <div key={ products[id].id } className="cartProductArea">
                <img alt={ products[id].title } src={ products[id].thumbnail } className="cartImage" />
                <div className="cartProductInformation">
                  <p className="productCartTitle" data-testid="shopping-cart-product-name">{ products[id].title }</p>
                  <p className="productCartPrice">{ `R$${products[id].price}` }</p>
                  <div className="buttonsArea">
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => handleQuantityDecrease(id) }
                      className="quantityButton"
                    >
                      -
                    </button>
                    <p data-testid="shopping-cart-product-quantity" className="quantityCartItem">
                      { products[id].quantity }
                    </p>
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => handleQuantityIncrease(id) }
                      className="quantityButton"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            ))
          }
          <Link to="/finish-buy">
            <button
              type="button"
              data-testid="checkout-products"
              className="endBuyCart"
            >
              Finish buy
            </button>
          </Link>
          <Link className="endBuyCart backButton" to="/">Back</Link>
        </div>
      </>
    );
  }
}

ShoppingCart.propTypes = {
  products: PropTypes.array,
}.isRequired;

export default ShoppingCart;
