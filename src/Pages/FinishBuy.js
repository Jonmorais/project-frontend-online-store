import React, { Component } from 'react';

class FinishBuy extends Component {
  render() {
    return (
      <>
        <label htmlFor="fullName">
          Nome Completo:
          <input
            type="text"
            name="fullName"
            data-testid="checkout-fullname"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="checkout-email"
            name="email"
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            type="text"
            max="11"
            name="cpf"
            data-testid="checkout-cpf"
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <input
            type="text"
            max="11"
            name="phone"
            data-testid="checkout-phone"
          />
        </label>
        <label htmlFor="cep">
          CEP:
          <input
            type="text"
            name="cep"
            max="8"
            data-testid="checkout-cep"
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            data-testid="checkout-address"
          />
        </label>
      </>
    );
  }
}

export default FinishBuy;
