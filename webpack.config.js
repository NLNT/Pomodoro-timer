const path = require('path') // npm install path

module.exports = {
  mode: "production", // "production", "development", "none"
  entry: './public/js/index.js', // path to your controller js file
  output: {
    path: path.resolve(__dirname, 'public'), // bundle file location (project/public/bundle.js) 
    filename: 'bundle.js' // bundled js file name
  },
  devServer: {
    port: 6060,
    contentBase: path.join(__dirname, 'public')
  }
}