// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

var path = require('path');
var webpack = require('webpack');
var writeStats = require("./utils/write-stats");
var notifyStats = require("./utils/notify-stats");

var assetsPath = path.resolve(__dirname, "../public/assets");

var WEBPACK_HOST = "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

// module.exports = {
//   // entry: './main.js',
//   output: { path: __dirname, filename: 'bundle.js' },
//   module: {
//     loaders: [
//       { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory"] }
//       // {
//       //   test: /.jsx?$/,
//       //   loader: 'babel-loader',
//       //   exclude: /node_modules/,
//       //   query: {
//       //     presets: ['es2015', 'react']
//       //   }
//       // }
//     ]
//   },
// };

module.exports = {
  devtool: "source-map", // "eval",
  entry: {
    front: [
      "webpack-dev-server/client?http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
      "webpack/hot/only-dev-server",
      "./src/app/client.js"
    ]
  },

  output: {
    path: assetsPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js",
    publicPath: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT + "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.css$/, loader: "style!css!autoprefixer?browsers=last 2 version!" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory"] },
      { test: /\.scss$/, loader: "style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true" }
    ]
  },
  progress: true,
  plugins: [

    // hot reload
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        LOCAL: process.env.LOCAL,
        BROWSER: JSON.stringify(true)
      }
    }),

    // stats
    function() {
      this.plugin("done", notifyStats);
    },

    function() {
      this.plugin("done", writeStats);
    },

    // print a webpack progress
    new webpack.ProgressPlugin(function(percentage, message) {
      var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
      var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
      process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
    })
  ]
}