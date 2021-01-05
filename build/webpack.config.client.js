const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// merge工具是做合并多个webpack文件的功能
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     module: true,
          //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
          //   }
          // },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      // vendor 一定要放在runtime前面
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 规避生成的文件hash变化，长缓存失效的问题
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
