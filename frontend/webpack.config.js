const path = require('path');

module.exports = {
  // Outras configurações do webpack, se houver...

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Esta regra corresponderá a arquivos .js e .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // Pasta de saída para as imagens
            },
          },
        ],
      },
      // Loader para imagens (PNG, JPEG, GIF, etc.)
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Converta as imagens em base64 se forem menores que 8KB
              name: '[name].[ext]',
              outputPath: 'images/', // Pasta de saída para as imagens
            },
          },
        ],
      },
      // Outras regras de loader para arquivos CSS, se necessário
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

//           npx webpack --mode production