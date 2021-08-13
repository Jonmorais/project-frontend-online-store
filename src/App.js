import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ShoppingCart from './Pages/ShoppingCart';
import Initial from './Pages/Initial';
import ProductDetail from './Pages/ProductDetail';
import FinishBuy from './Pages/FinishBuy';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
    this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.removeQuantity = this.removeQuantity.bind(this);
    const quantidade = localStorage.getItem('quantidade');
    if (!quantidade) {
      localStorage.setItem('quantidade', 0);
    }
  }

  handleChange(product) {
    const { products } = this.state;
    const maxQuantity = product.available;
    if (products[product.id]) {
      if (products[product.id].quantity >= maxQuantity) {
        return null;
      }
      products[product.id].quantity += 1;
    } else {
      products[product.id] = product;
    }
    this.addQuantity();
    // this.setState({
    //   products,
    // });
  }

  handleQuantityIncrease(id) {
    const { products } = this.state;
    const maxQuantity = products[id].available;
    if (products[id].quantity >= maxQuantity) {
      return null;
    }

    products[id].quantity += 1;
    this.setState({ products });
    this.addQuantity();
  }

  handleQuantityDecrease(id) {
    const { products } = this.state;
    products[id].quantity -= 1;
    this.setState({ products });
    this.removeQuantity();
  }

  addQuantity() {
    const quantidade = Number(localStorage.getItem('quantidade'));
    localStorage.setItem('quantidade', quantidade + 1);
  }

  removeQuantity() {
    const quantidade = Number(localStorage.getItem('quantidade'));
    localStorage.setItem('quantidade', quantidade - 1);
  }

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={ () => <Initial handleChangeOnCart={ this.handleChange } /> }
            />
            <Route
              path="/cart"
              component={ () => (
                <ShoppingCart
                  products={ products }
                  handleQuantityIncrease={ this.handleQuantityIncrease }
                  handleQuantityDecrease={ this.handleQuantityDecrease }
                />
              ) }
            />
            <Route
              path="/finish-buy"
              component={ FinishBuy }
            />
            <Route
              path="/product-detail/:id"
              render={ (props) => (
                <ProductDetail
                  { ...props }
                  handleChange={ this.handleChange }
                />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
