import React from 'react';

import ReduxComponent from '../ReduxComponent';
import GuestForm from '../ui/forms/guest-form';
import PaymentForm from '../ui/forms/payment-form';
import {RadioGroup, Radio} from 'react-radio-group';


class RegistrationPage extends ReduxComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      registrationTab: "0",
    };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange(value) {
    this.setState({
      registrationTab: value,
    })
  }

  render() {
    let selectedForm;

    switch (this.state.registrationTab) {
      case '1': {
        selectedForm = <PaymentForm />
        break;
      }
      default:
        selectedForm = <GuestForm />
    }
    return (
      <div className="registration-page">
        <RadioGroup selectedValue={this.state.registrationTab} className="" name="registrationType" onChange={this.onRadioChange}>
          <label><Radio value="0" />Free</label>
          <label><Radio value="1" />Commercial</label>
        </RadioGroup>
        {selectedForm}
      </div>
    );
  };
}

export default RegistrationPage;
