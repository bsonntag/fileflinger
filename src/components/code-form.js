import React, { Component } from 'react';

class RemoteCodeForm extends Component {

  state = { code: '' }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.code);
  }

  handleChange = event => {
    this.setState({ code: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {'Remote code'}

          <input
            name={'code'}
            onChange={this.handleChange}
            type={'text'}
            value={this.state.code}
          />
        </label>

        <button type={'submit'}>
          {'Submit'}
        </button>
      </form>
    );
  }

}

export default RemoteCodeForm;
