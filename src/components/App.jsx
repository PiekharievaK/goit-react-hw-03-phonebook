import { Component } from 'react';
import ContactForm from './NewContactForm/NewContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './ContactsFilter/ContactsFilter';
import { Confirm } from 'notiflix';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
  };

  componentDidMount() {
    if (!localStorage.getItem('contacts')) {
      return;
    }
    this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts === this.state.contacts) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  saveContact = data => {
    const shortid = require('shortid');

    const { name, number } = data;
    const contactInfo = { id: shortid(), name: name, number: number };
    this.setState(prevState => ({
      contacts: [contactInfo, ...prevState.contacts],
    }));
  };

  deleteContact = e => {
    const id = e.target.id;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ name: e.target.value });
  };

  findContacts = fieldValue => {
    const { contacts } = this.state;
    const loverValue = fieldValue.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(loverValue) ||
        contact.number.includes(loverValue)
      );
    });
    return filteredContacts;
  };

  //   Дополнительный функционал
  changeInfo = e => {
    const contacts = this.state.contacts;
    const contact = contacts.find(contact => contact.id === e.target.id);

    Confirm.prompt(
      'Choose what you want to change',
      `Edit contact '${contact.name}'. ` +
        'You can also cancel editing if you leave the field blank and select the option',
      '',
      'Name',
      'Number',
      clientAnswer => {
        if (clientAnswer.trim().length === 0 || !!Number(clientAnswer)) {
          window.alert(
            `There is a mistake somewhere. Contact name should include letters`
          );
          return;
        }
        const result = window.confirm(
          `Are you sure that you want to save your changes on name?`
        );
        if (!result) {
          return;
        }

        contact.name = clientAnswer;
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        this.setState({ contacts: this.state.contacts });
      },

      clientAnswer => {
        if (clientAnswer.trim().length === 0 || !Number(clientAnswer)) {
          window.alert(
            `There is a mistake somewhere. Phone number should include just numbers and acceptably '+' '-' symbols.`
          );
          return;
        }
        const result = window.confirm(
          `Are you sure that you want to save your changes on number?`
        );
        if (!result) {
          return;
        }

        contact.number = clientAnswer;
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        this.setState({ contacts: this.state.contacts });
      },
      {}
    );
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          contactsArr={this.state.contacts.map(contact =>
            contact.name.toLowerCase()
          )}
          Submit={this.saveContact}
        />

        <h2>Contacts</h2>
        <Filter value={this.state.name} changeFilter={this.changeFilter} />
        <ContactsList
          data={this.findContacts(this.state.name)}
          deleteFoo={this.deleteContact}
          ChangeFoo={this.changeInfo}
        />
      </>
    );
  }
}

export default App;
