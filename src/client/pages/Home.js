import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchMovies } from '../actions';
import { Link } from 'react-router-dom';
import dookielogo from '../CSS/assets/dookielogo.png';
import { Helmet } from 'react-helmet';

class Home extends Component {
	componentDidMount() {
		this.props.FetchMovies();
	}

	renderMovs() {
		const movies = this.props.movie;
		return Object.keys(movies).map((id) => {
			const movie = movies[id];
			return (
				<div className="col-md-6" key={id}>
					<li className="containers" key={id}>
						<div className="containers--title container-fluid pacifico">{movie.title}</div>
						<img className="containers__imgs img-fluid" src={movie.content} alt="moviepost" />
						<div className="containers--para quicksand">{movie.categories}</div>
					</li>
				</div>
			);
		});
	}
	head() {
		return (
			<Helmet>
				<title>Dookie - Home</title>
				<meta property="og:title" content="Dookie - Home" />
				<meta property="og:url" content="http://www.dookie.no/" />
				<meta
					property="og:description"
					content="Dookie is a page where you can watch videos with your friends share with them, every sunday we display different movies in Norwegian!"
				/>
				<meta property="og:site_name" content="Dookie" />
			</Helmet>
		);
	}

	render() {
		const { movie } = this.props;

		if (!movie) {
			return <div className="container">Loading...</div>;
		}
		return (
			<div>
				{this.head()}
				<div className="u-padding-8 home-background">
					<img
						className="display-block-auto img-fluid"
						src="https://data.whicdn.com/images/97429737/original.png"
						alt="dookie"
					/>
				</div>
				<div className="row">
					<div className="col-md-6">
						<a href="https://discord.gg/8ptUM3d">
							<button type="button" className="margin-center btn btn--discord quicksand">
								Join the Discord <i className="fab fa-discord" />
							</button>
						</a>
					</div>
					<div className="col-md-6">
						<Link to="/posts" className="margin-center btn container quicksand">
							Suggest a movie
						</Link>
					</div>
				</div>
				<ul className="list-group">{this.renderMovs()}</ul>
			</div>
		);
	}
}

function mapstate2props({ movie }) {
	return { movie };
}

function loadData(store) {
	return store.dispatch(FetchMovies());
}

export default {
	loadData,
	component: connect(mapstate2props, { FetchMovies })(Home),
};
