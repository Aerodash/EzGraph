const elixir = require('laravel-elixir');
var gulp = require("gulp");
var shell = require("gulp-shell");
require('laravel-elixir-vue-2');
require('laravel-elixir-remove');
var argv = require('yargs').argv;
// No source maps
elixir.config.sourcemaps = false;

if (!argv['build-vendor']) {

    var Task = elixir.Task;
    // Custom typescript task
    elixir.extend('typescript', function () {
        new Task('typescript', function () {
            return gulp.src('').pipe(shell("tsc -p tsconfig.json"));
        }).watch('./**/*.ts');
    });

    elixir(function (mix) {
        mix.remove('./_build/*.js') // remove old .js files
            .webpack('./View/Components/_all.js', './_build') // Compile .vue files
            .typescript() // Compile .ts files into .js files
            .scripts('./_build/*.js', './_build/app.js') // Concatenate .js files into one app.js file
            .remove(['./_build/_all.js', './_build/ts.js']); // Remove intermediate files
    });

} else {

    elixir(function(mix) {
        mix.scripts('./Vendor/*.js', './Vendor/_vendor.bundle.js');
    })
    
}