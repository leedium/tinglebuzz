import React from 'react';

class InputField extends React.PureComponent{
  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={this.props.type} placeholder={this.props.placeholder} name={this.props.name} onChange={this.props.onTextChange} />
      </div>
    );
  }
}

InputField.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onTextChange: React.PropTypes.func.isRequired,

};

export default InputField;
