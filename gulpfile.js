function html_include(cb){
    require("./gulp_modules/html_include")();
    cb();
}

function sass_build (cb){
    require("./gulp_modules/scss_build")();
    cb();
}

function sass_watch(cb){
    require("./gulp_modules/scss_watch")();
    cb();
}

exports.sassBuild = sass_build;
exports.sassWatch = sass_watch;
exports.html = html_include;