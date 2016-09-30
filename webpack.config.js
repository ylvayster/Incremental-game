const webpack = require('webpack'); //for use with plugins

module.exports = {
  entry: ['./dev-js/App.js'], //entry point for webpack
  output: {
    publicPath: '/dist/', 
    path: __dirname + '/dist', //put bundle.js (named below) in dist-folder
    filename: 'bundle.js'
  },
   module: {
         preLoaders: [
      {
        test: /\.js$/,            //look for .js-files
        exclude: /node_modules/,  //exclude node modules
        loader: 'jshint-loader'   //linting JS before bundle is built
      }
   ],
   	loaders: [
     {
       test: /\.js$/,             //look for .js-files
       exclude: /node_modules/,   //exclude node modules
       loader: 'babel-loader',    //transpiles es6 to es5
       query: {
        presets: ['react', 'es2015']    //presets for react and es2015 
       }
     },
    {
     test: /\.scss$/,                     //look for .scss-files
      loaders: ["style", "css", "sass"],  //transform scss code to css, inject in bundle.js
    },
   { 
     test: /.(jpe?g|png)$/,                       //look for .jpeg-, jpg- and png-files
     loader: 'file?name=img/[name].[hash].[ext]' //emits image files as file in the img folder in dist folder, filename MD5 hash, and returns the public url used in bundle.js 
   }
   ]
 },
  plugins: [

        //using react in production version when app is finished - remove plugin in dev mode. See https://facebook.github.io/react/downloads.html
        new webpack.DefinePlugin({
          "process.env": { 
        NODE_ENV: JSON.stringify("production") 
        }
        }),

        //built-in plugin to minify bundle
        new webpack.optimize.UglifyJsPlugin({ 
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],

 resolve: {
   extensions: ['', '.js', '.css', '.png', 'scss', 'jpeg', 'jpg'] //file formats looked for
 },
}