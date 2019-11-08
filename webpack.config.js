const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');


module.exports = {
	mode: 'development',
	devtool: 'source-map',
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
			use: ['style-loader', 'css-loader'],
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
		devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
	  }
	 
};


