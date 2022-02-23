import { Component } from 'react';
import PropTypes from 'prop-types';
import { Report, Confirm } from 'notiflix';
import s from './NewContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;
    const names = this.props.contactsArr;

    if (names.includes(name.toLowerCase())) {
      Report.warning(
        `'${name}' is already in contacts `,
        `Please change name to create unique contact`,
        'Okay',
        {
          titleMaxLength: 1000,
        }
      );
      return;
    }

    if (this.state.number.length < 7 || this.state.number.length > 12) {
      Confirm.show(
        'Unknown phone number format',
        'Are you sure you want to keep it?',
        'Yes',
        'No',
        () => {
          // При подтверждении
          this.props.Submit(this.state);
          this.reset();
        },
        () => {
          // при отказе
          return;
        }
      );
      return;
    }
    this.props.Submit(this.state);

    this.reset();
  };

  handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value,
    });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            className={s.input}
            onChange={this.handleChange}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
          />
        </label>
        <label className={s.label}>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            className={s.input}
            onChange={this.handleChange}
            value={this.state.number}
            placeholder="Enter number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

export default ContactForm;
