var path = require('path');
var SRC_DIR = path.resolve(__dirname, 'client/src');
var DIST_DIR = path.resolve(__dirname, 'client/dist');

module.exports = {
	entry: `${SRC_DIR}/index.jsx`,
	output: {
		filename: 'bundle.js',
		path: DIST_DIR
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: SRC_DIR,
				loader: 'babel-loader',
				query: {
					presets: [ '@babel/preset-env', '@babel/preset-react' ]
				}
			},
			{
				test: /\.(css)$/,
				use: [
					{
						loader: require.resolve('style-loader'),
						options: {
							insertInto: function() {
								if (document.getElementById('com') !== null) {
									console.log('ShadowDOM found, injecting CSS into shadowDOM');
									return document.getElementById('com');
								} else {
									return document.head;
								}
							}
						}
					},
					'css-loader'
				]
			},
			{
				test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'static/[name].[ext]',
					publicPath: '/'
				}
			},
			{
				test: [ /\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/ ],
				loader: require.resolve('file-loader'),
				options: {
					name: 'static/[name].[ext]',
					publicPath: '/'
				}
			}
		]
	}
};
