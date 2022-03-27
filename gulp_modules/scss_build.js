const dir = require("./dir");
const {src,dest,watch,series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

module.exports = function(){
    return new Promise(function(resolve){
        src(["./scratch/*.scss"])
            .pipe(sass().on('error', sass.logError))
            .pipe(dest("./dist"))
            .on("end",function(){
                console.log("[SCSS BUILD SUCCESS!]")
            })
        resolve();
    })
};