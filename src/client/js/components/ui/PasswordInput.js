import React from 'react';

class PasswordInput extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      viewstate: props.viewstate === 'verify' ? 1 : 0,
      valid: false,
    };
  }

  validateField(target) {
    console.log(target);
  }

  render() {
    return (
      <div className="input-field">
        <label htmlFor="password">{this.props.label1}</label>
        <input value={this.props.value} type={this.props.type}
               placeholder={this.props.placeholder}
               name="password"
               onChange={this.props.onValueChange}/>
        <label htmlFor="passwordverify">{this.props.label2}</label>
        <input value={this.props.value} type={this.props.type}
               placeholder={this.props.placeholder}
               name="passwordverify"
               onChange={this.props.onValueChange}/>
        <div className="error"><span>{this.props.error}</span></div>
      </div>
    );
  }
}

export default PasswordInput;
