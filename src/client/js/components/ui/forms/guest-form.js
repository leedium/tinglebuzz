import React from 'react';

import InputField from '../InputField';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';

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
  }

  onValueChange(e) {
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