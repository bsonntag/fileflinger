import React, { Component } from 'react';

class FilePicker extends Component {

  handleChange = event => {
    this.props.onChange(event.target.files[0]);
  }

  render() {
    return (
      <label>
        {'Choose a file: '}

        <input
          name={'file'}
          onChange={this.handleChange}
          type={'file'}
        />
      </label>
    );
  }

}

export default FilePicker;
