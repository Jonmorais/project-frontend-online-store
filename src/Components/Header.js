import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Pages/initial.css';

class Header extends Component {
  render() {
    const { change, search } = this.props;

    return (
      <div className="flex header">

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <div className="flex">
          <input
            type="text"
            onChange={ change }
            data-testid="query-input"
            placeholder="Search..."
          />

          <button
            type="button"
            data-testid="query-button"
            onClick={ search }
          >
            Search
          </button>

          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <img
              src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg"
              alt="Shopping Cart"
              height="30px"
            />
          </Link>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  change: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default Header;
