const {src,watch,series}= require('gulp');
const scss_build = require('./scss_build');

module.exports = async function(){
    await scss_build();
    return new Promise(function(resolve){
        watch(["./scrollswiper/*.scss"]).on('change',function(path){
            scss_build();
            console.log("[SCSS WATCH] "+path+" changed !")
        });
        resolve();
    });
}