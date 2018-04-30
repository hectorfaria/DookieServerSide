import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchPosts2, deletePost } from '../../actions/index';
import { Link } from 'react-router-dom';

class PostShow extends Component {
	componentDidMount() {
		//const posts = this.props.home;
		const { id } = this.props.match.params;
		this.props.FetchPosts2(id);
	}

	onDeleteClick() {
		const { id } = this.props.match.params;

		this.props.deletePost(id, () => {
			this.props.history.push('/posts');
		});
	}
	render() {
		const { post } = this.props;

		if (!post) {
			return <div className="container">Loading...</div>;
		}

		return (
			<div className="u-padding-8">
				<div className="container">
					<h3 className="titles pacifico">{post.title}</h3>
					<p>Categories: {post.categories}</p>
					<p className="para quicksand">{post.content}</p>
				</div>
				<div className="col-md-6">
					<Link className="btn btn--edit" to="/posts">
						<i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ post }, ownProps) {
	return { post: post[ownProps.match.params.id] };
}

export default {
	component: connect(mapStateToProps, { FetchPosts2, deletePost })(PostShow),
};
