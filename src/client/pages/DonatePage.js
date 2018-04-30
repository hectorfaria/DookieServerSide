import React, { Component } from 'react';
import StripeBilling from '../components/stripebilling';
import { connect } from 'react-redux';
import { FetchUser } from '../actions';
import RequireAuth from '../components/hocs/requireAuth';
import { Helmet } from 'react-helmet';

class DonatePage extends Component {
	componentDidMount() {
		this.props.FetchUser();
	}
	head() {
		return (
			<Helmet>
				<title>Dookie - Donate</title>
				<meta property="og:title" content="Dookie - Donate" />
				<meta property="og:url" content="http://www.dookie.no/donate" />
			</Helmet>
		);
	}

	render() {
		const { auth } = this.props;

		if (!auth) {
			return (
				<div className="u-padding-8">
					<img
						className="display-block-auto img-fluid "
						src="https://i.imgur.com/zkQOonQ.png"
						alt="404 not found"
					/>
					<div className="container titles pacifico">Please Login to continue...</div>;
				</div>
			);
		}

		return (
			<div className="u-padding-8">
				{this.head()}
				<div className="container">
					<b>
						<p className="container--para quicksand">
							This page is only for educationals Purposes - Flows and payments are FAKE and in no
							circustance we accept donations.
						</p>
					</b>
				</div>
				<h1 className="u-padding-8 titles pacifico">Donate now!</h1>

				<div className="row">
					<div className="col-md-4">
						<div className="container margin-donate-center">
							<h3 className="container--para pacifico">Stripe</h3>
							<StripeBilling />
							<h6 className="quicksand para">Donate Now!</h6>
						</div>
					</div>
					<div className="col-md-4">
						<div className="container margin-donate-center">
							<h3 className="container--para pacifico">Paypal</h3>
							<button className="btn--donate">
								<img
									src="https://files.startupranking.com/startup/thumb/32328_cfc4897b8f23a04c52aa148f8fa680d8b5218544_paypal_l.png"
									className="display-block-auto img-fluid"
									alt="paypal"
								/>
							</button>
							<h6 className="quicksand para">...Soon</h6>
						</div>
					</div>
					<div className="col-md-4">
						<div className="container margin-donate-center">
							<h3 className="container--para pacifico">Ethereum</h3>
							<button className="btn--donate">
								<img
									src="https://d3npzzrehyahmo.cloudfront.net/images/89/23/89231ba1d7cd720fb5d00106b33bf9db_4031156383d_t.png"
									className="display-block-auto img-fluid"
									alt="ethereum"
								/>
							</button>
							<h6 className="quicksand para">...Soon</h6>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapstate2props({ auth }) {
	return { auth };
}

export default {
	component: connect(mapstate2props, { FetchUser })(RequireAuth(DonatePage)),
};
