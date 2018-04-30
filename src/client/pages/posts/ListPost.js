import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchPosts } from '../../actions/index';
import { Link } from 'react-router-dom';

class ListPosts extends Component {
	componentDidMount() {
		this.props.FetchPosts();
	}

	renderPosts() {
		const posts = this.props.post;

		return Object.keys(posts).map((id) => {
			const post = posts[id];
			return (
				<Link to={`/posts/${post.id}`} key={post.id}>
					<li className="container quicksand container-fluid" key={id}>
						<div className="titles-sm">{post.title}</div>
					</li>
				</Link>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="u-padding-8">
					<Link className="btn btn--edit" to="/posts/new">
						<i className="fa fa-pencil-alt fa-2x" aria-hidden="true" />
					</Link>
				</div>
				<h3 className="titles pacifico margin-donate-center">Suggest a movie</h3>
				<ul className="display-block-auto">{this.renderPosts()}</ul>
			</div>
		);
	}
}

function mapstate2props(state) {
	return { post: state.post };
}

export default {
	component: connect(mapstate2props, { FetchPosts })(ListPosts),
};
