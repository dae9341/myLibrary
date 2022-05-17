function fadeSlider(wrapperId, option) {
    var me = this;
    var opt = $.extend({
        startIdx : 0,
        speed:1000,
        isPlay:true,

    },option);

    var $imgLayer = $(wrapperId).find(".c-fadeSlider__img");
    var $toggleBtn = $(wrapperId).find(".c-fadeSlider__btn");
    var imgLayer_len = $imgLayer.find("li").length;


    console.log(imgLayer_len);
    var interval;



    me.index = opt.startIdx;

    me.move = function (nowIdx, toIdx) {
        if(toIdx >= imgLayer_len){
            toIdx = 0;
        }

        if(!opt.isPlay){
            return;
        }else{

            if(nowIdx<toIdx){
                $imgLayer.find("li").eq(nowIdx).css({"opacity":0,"left":"0px","z-index":1});
                $imgLayer.find("li").eq(toIdx).css({"opacity":1,"left":"98px","z-index":20});
            }else if(nowIdx>toIdx){
                $imgLayer.find("li").eq(nowIdx).css({"opacity":0,"left":"98px","z-index":1});
                $imgLayer.find("li").eq(toIdx).css({"opacity":1,"left":"0px","z-index":20});

            }else{
                return;
            }


            me.index = toIdx;

        }
    };

    me.start = function(){
        interval = setInterval(function () {
            me.move(me.index,me.index+1);
        },opt.speed);
    };

    me.stop = function(){
        clearInterval(interval);
    };


    me.init = function () {
        $imgLayer.find("li").eq(me.index).css({"opacity":1,"left":"98px","z-index":20});
        me.start();

        $toggleBtn.on("click",function () {
            if($(this).hasClass("-on")){
                me.start();
                $(this).removeClass("-on");
            }else{
                me.stop();
                $(this).addClass("-on");
            }
        })
    };

    me.init();

}