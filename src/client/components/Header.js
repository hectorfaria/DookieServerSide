import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FetchUser } from '../actions';

class Header extends Component {
	componentDidMount() {
		this.props.FetchUser();
	}
	rendercontent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<a href="/api/auth/google" className="btn btn--google quicksand">
						Login with <b>Google</b>
					</a>
				);
			default:
				return [
					<span className="header__fonts pacifico nav-text" key="credits">
						Credits: {this.props.auth.credits}
					</span>,
					<a href="/api/logout" className="quicksand btn btn--google" key="logoutkey">
						Logout
					</a>,
					<Link to="/donate" key="Donate">
						<button type="button" className="btn btn--warning">
							<i className="fas fa-dollar-sign" />
						</button>
					</Link>,
					<Link to="/chat" key="Chat">
						<button type="button" className="btn btn--danger">
							<i className="fas fa-video" />
						</button>
					</Link>,
				];
		}
	}

	render() {
		return (
			<nav className="header navbar-fixed-top">
				<ul className="">
					<div className="col-md-9">
						<Link to="/" className="navbar-brand container-fluid">
							<img src="https://i.imgur.com/Ll3BaXB.png" className="logomonkey img-fluid" alt="" />
						</Link>
					</div>
					{this.rendercontent()}
				</ul>
			</nav>
		);
	}
}

function mapstate2props({ auth }) {
	return { auth };
}

export default connect(mapstate2props, { FetchUser })(Header);
