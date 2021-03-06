var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");

module.exports = {
	context: path.resolve(__dirname, "src"),
	devServer: {

	},
	devtool: "source-map",
	entry: [
		//"webpack-dev-server/client?http://localhost:8080",
		"webpack-dev-server/client?http://localhost:1337/",
		"webpack/hot/dev-server",
		"js/react/app.jsx"
	],
	module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        loaders: [
        	{ 
        		test: /\.css$/, 
        		// Use loader 1 to use Hot Module Replacement (HMR)
        		// Use loader 2 to extract the css file so it is included regularly
        		//loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader", "sass-loader") 
        		loader: "style-loader!css-loader!postcss-loader"
        	},
        	{ 
        		test: /\.scss$/, 
        		// Use loader 1 to use Hot Module Replacement (HMR)
        		// Use loader 2 to extract the css file so it is included regularly
        		//loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader", "sass-loader") 
        		loader: "style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax"
        	},
        	{
        		test: /\.jsx?/,
        		//include: path.resolve(".src/js"),
        		exclude: /node_modules/,
        		loader: "babel-loader"
        	},
        	{
		      test: /\.woff$/,
		      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
		    }, 
		    {
		      test: /\.woff2$/,
		      loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
		    }, 
		    {
		      test: /\.(eot|ttf|svg|gif|png)$/,
		      loader: "file-loader"
		    }
        ]
    },
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/",
		filename: "bundle.js"
	},
	/*postcss: function() {
		return [autoprefixer];
	},*/
	plugins: [
		new ExtractTextPlugin("styles.css"),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		root: [
			path.resolve("./src"),
			path.resolve("./src/js/react")
		],
		extensions: ['', '.js', '.jsx']
	},

	// JSHint enforcing options
	// http://jshint.com/docs/options/
	jshint: {
		// This option requires you to always put curly braces around 
		// blocks in loops and conditionals.
		curly: true,

		// This options prohibits the use of == and != in favor of === and !==. 
		// The former try to coerce values before comparing them which can 
		// lead to some unexpected results. 
		// The latter don't do any coercion so they are generally safer. 
		eqeqeq: true,

		// This option enables warnings about the use of identifiers 
		// which are defined in future versions of JavaScript. 
		// Although overwriting them has no effect in contexts where 
		// they are not implemented, this practice can cause issues 
		// when migrating codebases to newer versions of the language.
		futurehostile: true,

		// This option prohibits the use of explicitly undeclared variables. 
		// This option is very useful for spotting leaking and mistyped variables.
		undef: true,

		// This option warns when you define and never use your variables. 
		// It is very useful for general code cleanup, 
		// especially when used in addition to undef.
		unused: true,

		// This option defines globals that are usually used for 
		// logging poor-man's debugging: console, alert, etc. 
		// It is usually a good idea to not ship them in production because, 
		// for example, console.log breaks in legacy versions of Internet Explorer.
		devel: true,

		// This option is used to specify the ECMAScript version to which the code must adhere. 
		esversion: 6
	}
}