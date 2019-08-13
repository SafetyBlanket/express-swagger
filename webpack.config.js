const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = env => {
    return {
        entry: path.join(__dirname, 'src', 'index.ts'),
        target: 'node',
        externals: [nodeExternals()],
        mode: env.NODE_ENV,
        watch:  env.NODE_ENV !== 'production',
        devtool: env.NODE_ENV === 'development' ? 'source-map' : '',
        output: {
            filename: 'index.js',
            path: path.join(__dirname, 'dist')
        },
        module: {
            rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            alias: {
                '@logs':    path.resolve(__dirname, 'logs'),
                '@models':  path.resolve(__dirname, 'src/models/'),
                '@public':  path.resolve(__dirname, 'src/public'),
                '@routes':  path.resolve(__dirname, 'src/routes/'),
                '@shared':  path.resolve(__dirname, 'src/shared/'),
                '@spec':    path.resolve(__dirname, 'spec'),
                '@views':   path.resolve(__dirname, 'src/views')
            }
        },
        plugins: [
            new ProgressBarPlugin({
                format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            }),
            new CleanWebpackPlugin({
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: false
            }),
            new CopyWebpackPlugin([
                { from: 'src/public', to: 'public' },
                { from: 'src/views', to: 'views' } 
            ]),
            new NodemonPlugin({
                watch: path.resolve('./dist'),
                verbose: false,
                nodeArgs: ['--inspect=0.0.0.0'],
                script: './dist/index.js',
                ext: 'js,ts,tsx,json'
            })
        ]
    }
}