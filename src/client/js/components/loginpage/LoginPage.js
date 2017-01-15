import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import InputField from '../ui/InputField';
import EmailInput from '../ui/EmailInput';
import ReduxComponent from '../ReduxComponent';
import * as userActions from '../../../../api/actions/userActions';

class LoginPage extends ReduxComponent {
  constructor(props, context){
    super(props, context);
    this.onValueChange = this.onValueChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      form: {
        email: 'leedium@me.com',
        password: 'astrongpassword',
        isValid: false,
      },
      errors: {
        email: '',
        password: '',
      },
    };
  }

  onLogin(e) {
    e.preventDefault();
    this.props.requestLogin({
      username: this.state.form.email,
      password: this.state.form.password,
      type: 'DB'}).then(res => this.goHome());
  }

  onValueChange(e) {
    this.setState({
      form: Object.assign({},this.state.form,{
        [e.target.name]: e.target.value,
      }),
    });
  }

  componentDidMount() {
    //if(this.authservice.loggedIn()){
    //  this.goHome();
    //}
  }

  goHome() {
    this.props.router.push('/home');
  }

  render() {
    return (
      <div>
        <form>
          <EmailInput error={this.state.errors.email} value={this.state.form.email} placeholder="" type="" name="email" label="" onValueChange={this.onValueChange} />
          <InputField error={this.state.errors.password} value={this.state.form.password} placeholder="" type="password" name="password" label="Password" onValueChange={this.onValueChange} />
          <button onClick={this.onLogin}>login</button>
        </form>
        <p>Not a member? <Link to="/register">Register here</Link></p>
      </div>
    );
  }
};

export default connect(ReduxComponent.mapStateToProps, userActions)(LoginPage);
