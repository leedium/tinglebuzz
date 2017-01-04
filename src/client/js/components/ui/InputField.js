import React from 'react';

class InputField extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      valid: false,
    };
  }

  validateField(target) {
    console.log(target);
  }

  render() {
    return (
      <div className="input-field">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input value={this.props.value} type={this.props.type} placeholder={this.props.placeholder} name={this.props.name} onChange={this.props.onChange} />
        <div className="error"><span>{this.props.error}</span></div>
      </div>
    );
  }
}

InputField.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string.isRequired,
};

export default InputField;
