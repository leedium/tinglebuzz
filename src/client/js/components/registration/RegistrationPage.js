import React from 'react';

import InputField from '../ui/InputField';
import EmailInput from '../ui/EmailInput';
import ReduxComponent from '../ReduxComponent';

class RegistrationPage extends ReduxComponent {
  constructor(props, context) {
    super(props, context);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {

  }

  render() {
    return (
      <div className="registration-page">
        <form>
          <EmailInput error="" type="" value="" name="" label="Email" placeholder="" onChange={this.onInputChange} />
          <InputField error="" type="text" value="" name="username" label="Username" placeholder="Username" onChange={this.onInputChange} />
        </form>
      </div>
    );
  };
}

export default RegistrationPage;
