import React from 'react';
import {connect} from 'react-redux';

import InputField from '../ui/InputField';
import ReduxComponent from '../ReduxComponent';

class LoginPage extends ReduxComponent {
  constructor(props, context){
    super(props, context);
    this.onTextChange = this.onTextChange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onTextChange (e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    return (
      <div>
        <form>
          <InputField placeholder="email@email.com" type="email" name="email" label="Email" onTextChange={this.onTextChange}/>
          <InputField placeholder="" type="password" name="password" label="Password" onTextChange={this.onTextChange}/>
          <button onClick={this.onLogin}>login</button>
        </form>
      </div>
    );
  }
};

export default connect(ReduxComponent.mapStateToProps)(LoginPage);
