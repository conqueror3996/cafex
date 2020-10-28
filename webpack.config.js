var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue', '.png', '.jpg']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                  name: 'static/img/[path][name].[ext]',
                },
              },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                //    config.module.rule('images').use('url-loader') ,
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10240,
                      fallback: {
                        loader: 'url-loader',
                        options: {
                          name: 'static/img/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: './static', 
                    to: './static',
                },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://192.168.11.110:4000',
            API_KEY: '82e29d468d7f4b518347a2eab84b478719027367c67f4e00bfd84244067101f0',
            VERSION: '1.0.0'
        })
    }
}