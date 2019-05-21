module.exports = {
  path: {
    assets: 'assets',
    css: 'css',
    js: 'js',
    images: 'images',
    fonts: 'fonts',
    styleguide: 'styleguide'
  },
  imageminQuality: {
    mozjpeg: 80, // 0 ~ 100
    pngquant: [
      0.5,
      0.6
    ], // [0 ~ 1, 0 ~ 1]
    webp: 75 // 0 ~ 100
  },
  browsers: 'last 2 versions',
  styleguide: {
    useFrontworkCSS: true,
    watch: false
  },
  isMinify: false,
  wp: {
    theme: 'my-theme',
    useSync: false
  }
};
