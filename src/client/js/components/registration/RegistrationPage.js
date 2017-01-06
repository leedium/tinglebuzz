import React from 'react';

import ReduxComponent from '../ReduxComponent';
import InputField from '../ui/InputField';
import EmailInput from '../ui/EmailInput';
import PasswordInput from '../ui/PasswordInput';

class RegistrationPage extends ReduxComponent {
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
    return (
      <div className="registration-page">
        <form action="/transaction-endpoint" method="post">
          <fieldset>
            <EmailInput error="" type="" value={email} name="" label="Email" placeholder="" onValueChange={this.onValueChange} />
            <InputField error="" type="text" value={username} name="username" label="Username" placeholder="Username" onValueChange={this.onValueChange} />
            <PasswordInput viewstate="verify" label1="Password" label2="Verify Password" onValueChange={this.onValueChange}/>
          </fieldset>
        </form>
      </div>
    );
    const {email, username} = this.state.form
  };
}

export default RegistrationPage;
