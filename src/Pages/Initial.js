import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import * as api from '../services/api';
import './initial.css';

class Initial extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryId: '',
      query: '',
      products: [],
      quantidade: 0,
    };

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOnInput = this.handleChangeOnInput.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts();
    this.getQuantity();
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      query: value,
    });
  }

  async handleChangeOnInput(event) {
    const { value } = event.target;
    const { query } = this.state;
    await this.setState({
      categoryId: value,
    });

    if (!query) {
      this.fetchProducts();
    }
  }

  getQuantity() {
    const quantidade = Number(localStorage.getItem('quantidade'));
    this.setState({ quantidade });
  }

  async fetchCategories() {
    const categories = await api.getCategories();
    this.setState({
      categories,
    });
  }

  async fetchProducts() {
    const { categoryId, query } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(categoryId, query);
    if (!products) return;
    const { results } = products;
    this.setState({
      products: results,
    });
  }

  render() {
    const { categories, products, quantidade } = this.state;
    const { handleChangeOnCart } = this.props;
    const quantity = 1;
    return (
      <div>
        <Header
          change={ this.handleChange }
          search={ this.fetchProducts }
          quantidade={ quantidade }
        />
        <div className="main-content products-session">

          <div className="category">
            {
              categories.map(({ name, id }) => (
                <div key={ id } data-testid="category">
                  <label htmlFor={ id }>
                    <input
                      type="radio"
                      name="category"
                      id={ id }
                      value={ id }
                      onChange={ this.handleChangeOnInput }
                    />
                    {name}
                  </label>
                </div>
              ))
            }
          </div>

          <div className="content-container" id="products-session">
            <div className="content">
              {
                products.map(
                  (
                    { id, title, price, thumbnail,
                      attributes, available_quantity: available, shipping },
                  ) => (
                    <div key={ id } className="productArea">
                      <Link
                        data-testid="product-detail-link"
                        to={ {
                          pathname: `/product-detail/${id}`,
                          title,
                          price,
                          thumbnail,
                          attributes,
                          id,
                          available,
                          shipping,
                        } }
                      >
                        <div data-testid="product" className="product">
                          <img src={ thumbnail } alt={ title } />
                          <div className="infoArea">
                            <p className="productTitle">{title}</p>
                            <p>{`R$${price}`}</p>
                            {
                              shipping.free_shipping
                                ? <p data-testid="free-shipping" className="freeShipping">Frete Grátis</p>
                                : <p className="noFreeShipping">Sem frete grátis</p>
                            }

                          </div>
                        </div>
                      </Link>
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                        className="addToCard"
                        onClick={ () => {
                          handleChangeOnCart(
                            { title, thumbnail, price, id, quantity, available },
                          );
                          this.getQuantity();
                        } }
                      >
                        Add to cart
                      </button>
                    </div>
                  ),
                )
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Initial.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;

export default Initial;
