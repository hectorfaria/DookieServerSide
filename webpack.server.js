const path = require('path');

const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						'react',
						'stage-0',
						[
							'env',
							{
								targets: {
									browsers: [ 'last 2 versions' ],
								},
							},
						],
					],
				},
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
			},

			{
				test: /\.(png|woff|eot|ttf|swf)/,
				loader: 'url-loader?limit=1',
			},
			{
				test: /\.svg/,
				loader: 'file-loader',
			},
		],
	},

	externals: [ webpackNodeExternals() ],
};
