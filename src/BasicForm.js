import React from 'react';
import './App.css';

class BasicForm extends React.Component {
  static displayName = "basic-input";

  state = {
    name: '',
    email: '',
    phone: '',
    names: [],
    errors: {}
  };

  validateField = (fieldName, value) => {
    let errors = { ...this.state.errors };

    switch (fieldName) {
      case 'name':
        errors.name = value.trim() === '' ? 'Name is required' : '';
        break;
      case 'email':
        errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case 'phone':
        errors.phone = /^[0-9]{10}$/.test(value) ? '' : 'Phone must be 10 digits';
        break;
      default:
        break;
    }

    this.setState({ errors });
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value); // Real-time validation
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { name, email, phone } = this.state;

    // Always validate before trying to submit
    this.validateField('name', name);
    this.validateField('email', email);
    this.validateField('phone', phone);

    const { errors } = this.state;

    const formValid =
      !errors.name && !errors.email && !errors.phone &&
      name.trim() !== '' && email.trim() !== '' && phone.trim() !== '';

    if (formValid) {
      const newEntry = { name, email, phone };
      this.setState(prevState => ({
        names: [...prevState.names, newEntry],
        name: '',
        email: '',
        phone: '',
        errors: {}
      }));
    }
  };

  render() {
    const { name, email, phone, names, errors } = this.state;

    return (
      <div className="form-container">
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.handleSubmit} className="basic-form">
          <div className="form-field">
            <input
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-field">
            <input
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-field">
            <input
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={this.handleChange}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>

          <input type="submit" value="Submit" className="submit-button" />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            {names.map((entry, i) => (
              <li key={i}>{entry.name} - {entry.email} - {entry.phone}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BasicForm;
