var dest = "./build/";
var src = './src/';

module.exports = {
  root: {
    src: src,
    dest: dest
  },
  less: {
    src: src +'less/',
    dest: dest + 'css/'
  },
  browserify: {
    src: src + 'js/',
    dest: dest + 'js/'
  },
  assets: {
    src: src + 'assets/**/*',
    dest: dest + 'assets'
  },
  browserSync: {
    server: {
      baseDir: [dest]
    },
    files: [
      dest + "/**",
      // Exclude Map files
      "!" + dest + "/**.map"
    ]
  }
}