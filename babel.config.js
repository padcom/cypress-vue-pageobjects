module.exports = process.env.CYPRESS_ENV
  ? {}
  : { presets: [ '@vue/app' ] }
