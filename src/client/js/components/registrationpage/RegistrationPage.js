import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import {connect} from 'react-redux';

import ReduxComponent from '../ReduxComponent';
import GuestForm from '../ui/forms/guest-form';
import PaymentForm from '../ui/forms/payment-form';
import * as userActions from '../../../../api/actions/userActions';


class RegistrationPage extends ReduxComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      registrationTab: '0',
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onSSOLogin = this.onSSOLogin.bind(this);
  }

  onSSOLogin(obj) {

    console.log(obj)

    this.props.requestLogin(obj).then((res) => {

    });
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
        selectedForm = <GuestForm onSSOLogin={this.onSSOLogin} />
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

export default connect(ReduxComponent.mapStateToProps, userActions)(RegistrationPage);
