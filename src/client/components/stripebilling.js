import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { stripeClientID } from '../../config/keys';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class StripeBilling extends Component {
	render() {
		return (
			<StripeCheckout
				name="Dookie"
				description="Flows and payments are FAKE"
				image="https://i.imgur.com/Ll3BaXB.png"
				amount={100}
				token={(token) => this.props.handleStripeToken(token)}
				currency="USD"
				stripeKey={stripeClientID}
				panelLabel="Pay Now!"
				bitcoin
			>
				<button className="btn--donate">
					<img
						src="https://new.innovatefinance.com/wp-content/uploads/2017/06/stripe_logo.png"
						className="img-fluid"
						alt="stripe"
					/>
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, Actions)(StripeBilling);
