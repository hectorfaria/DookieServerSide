import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreatePosts } from '../../actions/index';

const FIELDS = {
	title: { type: 'input', label: 'Enter some title' },
	categories: { type: 'input', label: 'Enter some categories' },
	content: { type: 'textarea', label: 'Enter some description' },
};

class NewPost extends Component {
	renderField(field) {
		return (
			<div className="container">
				<label className="">{field.label}</label>
				<div className="has-danger">
					<field.type
						className="form-control"
						rows="8"
						cols="50"
						name="content"
						form="usrform"
						type="text"
						{...field.input}
					/>
				</div>

				<div className="text-error">{field.meta.touched ? field.meta.error : ''}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.CreatePosts(values, () => {
			this.props.history.push('/posts');
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="u-padding-8 titles-sm quicksand">
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div className="row">
						<div className="col-md-2" />
						<div className="col-md-3">
							<Field label="Title" name="title" type="input" component={this.renderField} />
						</div>
						<div className="col-md-2" />
						<div className="col-md-3">
							<Field label="Categories" name="categories" type="input" component={this.renderField} />
						</div>
					</div>
					<div className="row u-margin-up-5">
						<Field
							label="Why you want this film?"
							name="content"
							type="textarea"
							component={this.renderField}
						/>
					</div>
					<div className="col-md-6">
						<button type="submit" className="btn btn--danger">
							<i className="fa fa-save fa-2x" aria-hidden="true" />
						</button>
					</div>
					<div className="col-md-6">
						<Link className="btn btn--danger" to="/posts">
							<i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = `Error enter some ${field}`;
		}
	});
	return errors;
}

export default {
	component: reduxForm({
		validate,
		form: 'PostNewForm',
		fields: _.keys(FIELDS),
	})(connect(null, { CreatePosts })(NewPost)),
};
