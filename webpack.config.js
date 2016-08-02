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
	}
}