import React from 'react';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Section, Phonebook, Contacts, Filter } from 'components';

import { Container } from './App.styled';

// Generator ids
import { nanoid } from 'nanoid';

class App extends Component {
  // Global states
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // Add contacts
  handleAddContact = (e, name, number) => {
    e.preventDefault();
    const currentName = name;
    const currentNumber = number;
    const contacts = this.state.contacts;

    // Check on exist contact
    const isExist = contacts.some(user => {
      return user.name === currentName;
    });
    if (isExist) {
      Notify.warning(`${currentName} is already exists`);
      return;
    }

    // Create obj of new user
    const currentUser = {
      id: nanoid(),
      name: currentName,
      number: currentNumber,
    };

    // Change state
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, currentUser] };
    });
  };

  // Delete contact
  handleDeleteContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts;
      const pos = newContacts.findIndex(user => user.id === id);
      if (pos >= 0) {
        newContacts.splice(pos, 1);
        return { contacts: newContacts };
      }
    });
  };

  // On input filter
  handleInputFilter = e => {
    const newFilter = e.target.value;
    this.setState({ filter: newFilter });
  };

  // Filtering contacts by name
  getFilteredContacts = filterName => {
    const contacts = this.state.contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase())
    );
  };

  render() {
    // Name for filtering
    const filterName = this.state.filter;

    // Preparing contacts to render(filtered or all)
    const contactsToShow =
      filterName.length > 0
        ? this.getFilteredContacts(filterName)
        : this.state.contacts;
    return (
      <Container>
        <Section title="Phonebook">
          <Phonebook onSubmit={this.handleAddContact} />
        </Section>

        <Section title="Contacts">
          <Filter onInputFilter={this.handleInputFilter} />
        </Section>
        <Contacts
          contacts={contactsToShow}
          onDeleteUser={this.handleDeleteContact}
        />
      </Container>
    );
  }
}

export { App };
