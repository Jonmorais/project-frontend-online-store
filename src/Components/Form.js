import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      rating: 0,
      comment: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  render() {
    const { comment, email, rating } = this.state;
    return (
      <>
        <h3>Avaliações</h3>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="rating">
          <input
            value={ rating }
            name="rating"
            type="number"
            max="5"
            min="0"
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="comment">
          <textarea
            data-testid="product-detail-evaluation"
            name="comment"
            id="comment"
            value={ comment }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
        >
          Evaluate
        </button>
      </>
    );
  }
}

export default Form;
