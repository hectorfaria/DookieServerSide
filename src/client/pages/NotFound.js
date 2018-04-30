import React from 'react';

const NotFound = ({ staticContext = {} }) => {
	staticContext.notFound = true;

	return (
		<div className="u-padding-8">
			<img className="display-block-auto img-fluid" src="https://i.imgur.com/zkQOonQ.png" alt="404 not found" />
			<h1 className="titles pacifico">Page not Found</h1>
		</div>
	);
};

export default {
	component: NotFound,
};
