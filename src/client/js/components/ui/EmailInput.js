import React from 'react';
import InputField from './InputField';

class EmailInput extends InputField {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valid: '',
    }
    this.onTextBlur = this.onTextBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validateEmail() {
    return false;
  }

  onChange(e) {
    this.props.onChange(e);
  }

  onTextBlur(e) {
    super.validateField(e.target);
    this.setState({
      valid: this.validateEmail(),
    });
  }

  render() {

    const classes = (this.state.valid === '' || this.state.valid) ? 'input-field ' : 'input-field input-field-invalid';
    return (
      <div className={classes}>
        <label htmlFor="email">Email</label>
        <input value={this.props.value} type="email" placeholder="email@address.com" name="email"
               onBlur={this.onTextBlur} onChange={this.onChange}/>
        <div className="error"><span>{this.props.error}</span></div>
      </div>
    );
  }
}

export default EmailInput;