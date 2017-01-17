import React from 'react';

import InputField from '../InputField';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import {UserActionTypes} from '../../../../../api/actions/ActionTypes'

class GuestForm extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      form: {
        email: '',
        username: '',
        password: '',
      },
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSocialLogin = this.onSocialLogin.bind(this);
  }

  onSocialLogin(e) {
    e.preventDefault();
    this.props.onSSOLogin({
      type: 'sso',
      providerType: e.target.getAttribute('data-provider'),
    })
  }

  onValueChange(e) {
    e.preventDefault();
    this.setState({
      form: Object.assign({}, this.state.form, {
        [e.target.name]: e.target.value,
      }),
    });
  }

  render() {
    const {email, username} = this.state.form;

    return (
      <form action="/transaction-endpoint" method="post">
        <button data-provider="facebook" onClick={this.onSocialLogin}>Login with Facebook</button>
        <fieldset>
          <EmailInput error="" type="" value={email} name="" label="Email" placeholder="" onValueChange={this.onValueChange} />
          <InputField error="" type="text" value={username} name="username" label="Username" placeholder="Username" onValueChange={this.onValueChange} />
          <PasswordInput viewstate="verify" label1="Password" label2="Verify Password" onValueChange={this.onValueChange}/>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    );
  }
}

export default GuestForm;