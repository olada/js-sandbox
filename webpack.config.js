var path = require("path");

module.exports = {
	context: path.resolve(__dirname, "src"),
	devtool: "source-map",
	entry: [
		"webpack-dev-server/client?http://localhost:8080",
		"app"
	],
	module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ]
    },
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/build/",
		filename: "bundle.js"
	},
	resolve: {
		root: path.resolve("./src/js")
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
		devel: true
	}
}