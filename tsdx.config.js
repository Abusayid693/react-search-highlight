const svg = require('rollup-plugin-svg');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    const external = config.external;
    config.external = id => (id.match(/.svg$/) ? false : external(id));
    config.plugins.push(
      svg({
        base64: false,
      }),
      postcss({
        inject: true,
         extract: !!options.writeMeta,
       }),
    );
    return config;
  },
};
