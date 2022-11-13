import React from 'react';
import { Component } from 'react';

// Check types of props
import PropTypes from 'prop-types';
import { Field } from 'components/base/Field/Field.styled';


class Filter extends Component {
  render() {
    const { onInputFilter } = this.props;
    return (
      <>
        <p>Find contacts by name</p>
        <Field type="text" onChange={onInputFilter} />
      </>
    );
  }
}

export { Filter };

// Types
Filter.propTypes = {
  onInputFilter: PropTypes.func.isRequired,
};
