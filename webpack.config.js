var path = require("path");

module.exports = {
	context: path.resolve(__dirname, "src"),
	devtool: "source-map",
	entry: [
		"webpack-dev-server/client?http://localhost:8080",
		"app"
	],
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/build/",
		filename: "bundle.js"
	},
	resolve: {
		root: path.resolve("./src/js")
	}
}