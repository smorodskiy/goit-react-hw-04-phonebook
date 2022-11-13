import React from 'react';
import { Component } from 'react';

// Check types of props
import PropTypes from 'prop-types';
import { AddButton } from './Phonebook.styled';
import { Field } from 'components/base/Field/Field.styled';

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  // On input name
  handleInputName = e => {
    const newName = e.target.value;
    this.setState({ name: newName });
  };

  // On input number
  handleInputNumber = e => {
    const newNumber = e.target.value;
    this.setState({ number: newNumber });
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <form onSubmit={(e) => onSubmit(e, this.state.name, this.state.number)}>
        <div>
          <p>Name</p>
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputName}
          />
        </div>
        <div>
          <p>Number</p>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputNumber}
          />
        </div>
        <AddButton type="submit">Add contact</AddButton>
      </form>
    );
  }
}

export { Phonebook };

// Types
Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
