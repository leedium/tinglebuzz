import React from 'react';
import braintreeClient from 'braintree-web/client';

import InputField from '../InputField';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';

import {ClientRequest} from '../../../../../api/request/request';


class PaymentForm extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      clientToken: null,
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

  componentDidMount() {
    ClientRequest.getBrainTreeClientToken()
      .then((res) => {
        this.setState({
          clientToken: res.clientToken,
        });
      })
      .catch((err) => {
        this.setState({
          clientToken: null,
        });
      });
  }

  componentDidUpdate() {
    if(this.state.clientToken !== null){
      braintreeClient.create({
        authorization: this.state.clientToken,
      }, (clientErr, instance) => {
        //console.log(clientErr, instance);
      });
    }
  }

  render() {
    const {email, username} = this.state.form;
    const enableSubmit = this.state.clientToken != null ? false : true;

    return (
      <form action="/transaction-endpoint" method="post">
        <fieldset>
          <EmailInput error="" type="" value={email} name="" label="Email" placeholder="" onValueChange={this.onValueChange} />
          <InputField error="" type="text" value={username} name="username" label="Username" placeholder="Username" onValueChange={this.onValueChange} />
          <PasswordInput viewstate="verify" label1="Password" label2="Verify Password" onValueChange={this.onValueChange}/>
        </fieldset>
        <fieldset>
          <label htmlFor="card-number">Card Number</label>
          <div className="hosted-field" id="card-number"></div>

          <label htmlFor="cvv">CVV</label>
          <div className="hosted-field" id="cvv"></div>

          <label htmlFor="expiration-date">Expiration Date</label>
          <div className="hosted-field" id="expiration-date"></div>

          <input type="hidden" name="payment-method-nonce" />
          <input type="submit" value="Pay $10" disabled={enableSubmit} />
        </fieldset>
      </form>
    );
  }
}

export default PaymentForm;