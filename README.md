# Web-dev template
v.0.0.1b

Includes a basic html5 page template with folder structure.
Bower.json for installing frequently usable libraries.
And gulpfile.js with for "every-day" tasks.

For quick scaffolding don't install npm dependencies.
Install all this packages globally and link its inside the project directory.

1. Install globally:
```shell
npm install -g autoprefixer babel-cli bower browser-sync cordova del eslint express forever grunt-cli gulp gulp-autopolyfiller gulp-autoprefixer gulp-base64 gulp-concat gulp-htmlmin gulp-if gulp-imagemin gulp-inline-css gulp-inline-source gulp-jscs gulp-jshint gulp-less gulp-load-plugins gulp-minify-css gulp-minify-html gulp-postcss gulp-processhtml gulp-rename gulp-size gulp-sourcemaps gulp-tinypng gulp-uglify gulp-uncss gulp-useref gulp-util gulp-zip htmlprocessor imagemin-pngquant jscs jshint less yo
```

2. Link using `npm link`
````shell
npm link browser-sync del gulp gulp-autopolyfiller gulp-autoprefixer gulp-base64 gulp-concat gulp-htmlmin gulp-if gulp-imagemin gulp-inline-css gulp-inline-source gulp-jscs gulp-jshint gulp-less gulp-load-plugins gulp-minify-css gulp-minify-html gulp-postcss gulp-processhtml gulp-rename gulp-size gulp-sourcemaps gulp-tinypng gulp-uglify gulp-uncss gulp-useref gulp-util gulp-zip imagemin-pngquant
````