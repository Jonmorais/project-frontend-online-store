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
  }

  handleChange(product) {
    const { products } = this.state;
    if (products[product.id]) {
      products[product.id].quantity += 1;
    } else {
      products[product.id] = product;
    }
    // this.setState({
    //   products,
    // });
  }

  handleQuantityIncrease(id) {
    const { products } = this.state;
    products[id].quantity += 1;
    this.setState({ products });
  }

  handleQuantityDecrease(id) {
    const { products } = this.state;
    products[id].quantity -= 1;
    this.setState({ products });
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
