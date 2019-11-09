
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const port = 1111;
const publicPath = `http://localhost:${port}`;
const child_process = require('child_process');
const perf = require('execution-time')();

perf.start('webpack');

module.exports = {
	
	mode: 'development',
	devtool: 'source-map',
	
	entry: [
		`webpack-dev-server/client?http://localhost:${port}/`,
		require.resolve('./src/index')
	],
	module: {
		rules: [
		{
		 test: /\.(js|jsx)$/,
		 exclude: /node_modules/,
		 use: {
			loader: "babel-loader"
		      }
		},
		{
			test: /\.html$/,
			use: [
			  {
				loader: "html-loader"
			  }
			]
		  },
		  {
			test: /\.css$/i,
			use: [
				{
				  loader: 'style-loader'
				},
				{
				  loader: 'css-loader',
				  options: {
					sourceMap: true
				  }
				}
			  ]
			},
		  
		  
		{
			test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
			exclude: /node_modules/,
			use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
		  }
	
	      ]
	},
	plugins: [
		new HtmlWebPackPlugin({
		  template: "./public/index.html",
		  filename: "./index.html"
		})
		
	  ],
	  output: {
		publicPath: `http://localhost:${port}/`,
		filename: 'renderer.dev.js',
		devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
	  },

	  devServer: {
		port,
		publicPath,
		compress: false,
		noInfo: true,
		stats: 'errors-only',
		inline: true,
		lazy: false,
		hot: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		contentBase: path.join(__dirname, 'dist'),
		watchOptions: {
		  aggregateTimeout: 300,
		  ignored: /node_modules/,
		  poll: 100
		},
		historyApiFallback: {
		  verbose: true,
		  disableDotRule: false
		},
		before() {
			console.log('Starting Main Process...');
			child_process.spawn('npm', ['run', 'start-main-dev'], {
			  shell: true,
			  env: process.env,
			  stdio: 'inherit'
			})
			  .on('close', code => process.exit(code))
			  .on('error', spawnError => console.error(spawnError));
		  
		}
	  }
	 
};


