var gulp = require("gulp"),
	gutil = require("gulp-util"),
	webpack = require("webpack"),
	clean = require("gulp-clean"),
	runSequence = require("run-sequence"),
	webpack_stream = require("webpack-stream"),
	WebpackDevServer = require("webpack-dev-server"),
	webpackConfig = require("./webpack.config.js");

const src_path = "./src";
const dst_root_path = "./build";
const dst_js_path = dst_root_path + "/js";

gulp.task("clean", function() {
	return gulp.src(dst_root_path + "/**/*")
		.pipe(clean().on("error", () => console.log));
});

gulp.task("html", ["clean"], function() {
	return gulp.src(src_path + "/html/*.html")
		.pipe(gulp.dest(dst_root_path))
});

gulp.task("webpack", ["clean"], function (cb) {
	return gulp.src(src_path)
		.pipe(webpack_stream(webpackConfig).on("error", () => console.log))
		.pipe(gulp.dest(dst_root_path));
});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	var options = {
		contentBase: myConfig.output.path,
		publicPath: "http://localhost:8080/",
		stats: {
			colors: true
		},
		hot: true
	};

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), options)
			.listen(8080, "localhost", function(err) {
				if(err) throw new gutil.PluginError("webpack-dev-server", err);
				gutil.log("[webpack-dev-server]", JSON.stringify(options));
			});
});

gulp.task("build", ["html", "webpack"]);

gulp.task("serve", ["webpack-dev-server"]);

gulp.task("build-and-serve", function() {
	return runSequence("build", "serve");
});

gulp.task('default', ["build"]);
