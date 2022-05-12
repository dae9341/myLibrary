const fileinclude = require('gulp-file-include');
const {src,dest,watch,series} = require('gulp');
const dir = require('./dir');

module.exports = function(){
    return new Promise(function(resolve){
        src(dir.modules.html)
        .pipe(fileinclude({
            prefix:'@@',
            basepath:'@file'
        }))
        .pipe(dist('./main/'))
        resolve();

    })
}