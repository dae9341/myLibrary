module.exports = {
    //결과물
    dist: {
        root:"./dist/",
        css:"./dist/css/",
        js:"./dist/js/",
        html:"./dist/html/"
    },

    modules:{
        scss:[
            "./mylib/scratch/*.scss",
            "./mylib/scrollswiper/*.scss"
        ],
        html:[
            "./mylib/scratch/*.html",
            "./mylib/scrollswiper/*.html",
        ]
    }

};