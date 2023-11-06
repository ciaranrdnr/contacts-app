/** @type {import('next').NextConfig} */
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const withPWA = require('next-pwa')({
  dest: 'public'
})
const runtimeCaching = require('next-pwa/cache')  

const isBuildPwa = (process.env.NODE_EN === 'development') || (process.env.DEBUG_PWA === 'true');

const nextConfig = {
  reactStrictMode: true,
   pwa: {
    disable: !isBuildPwa,
    register: isBuildPwa,
    dest: 'public',
    runtimeCaching,
    publicExcludes: ['!static/*'],
    buildExcludes: [
      /\.(?:map|)$/i,
      ({ asset }) => {
        if (asset.name.match(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i)) {
          return true;
        }
        if (asset.name.endsWith('.js')) {
          return true;
        }
      },
    ],
    additionalManifestEntries: [],
  },
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

module.exports = withPWA({
  nextConfig
});