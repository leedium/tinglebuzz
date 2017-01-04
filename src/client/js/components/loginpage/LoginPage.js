import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import InputField from '../ui/InputField';
import EmailInput from '../ui/EmailInput';
import ReduxComponent from '../ReduxComponent';

class LoginPage extends ReduxComponent {
  constructor(props, context){
    super(props, context);
    this.onTextChange = this.onTextChange.bind(this);
    this.state = {
      form: {
        email: '',
        password: '',
        isValid: false,
      },
      errors: {
        email: '',
        password: '',
      },
    };
  }

  onTextChange(e) {
    this.setState({
      form: Object.assign({},this.state.form,{
        [e.target.name]: e.target.value,
      }),
    });
  }

  render() {
    return (
      <div>
        <form>
          <EmailInput error={this.state.errors.email} value={this.state.form.email} placeholder="" type="" name="" label="" onChange={this.onTextChange} />
          <InputField error={this.state.errors.password} value={this.state.form.password} placeholder="" type="password" name="password" label="Password" onChange={this.onTextChange} />
          <button onClick={this.onLogin}>login</button>
        </form>
        <p>Not a member? <Link to="/register">Register here</Link></p>
      </div>
    );
  }
};

export default connect(ReduxComponent.mapStateToProps)(LoginPage);
