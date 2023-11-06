/** @type {import('next').NextConfig} */
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});



const nextConfig = {
  reactStrictMode: true,
   webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(new CleanWebpackPlugin());
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        })
      );
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
      }));
    }
    return config;
  }
}

module.exports = withBundleAnalyzer({
  nextConfig
});