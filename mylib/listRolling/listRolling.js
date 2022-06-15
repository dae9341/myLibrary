function listRolling(id,option){
    var me = this;
    var opt = $.extend({
        initIdx:0, // 시작인덱스
        delay:1500, // 슬라이드될까지 delay시간
    },option);

    const $wrapperId = $(id);
    const $btnSpread = $wrapperId.find();
    const $list = $wrapperId.find("ol>li");
    me.activeIdx = opt.initIdx;
    $list.eq(me.activeIdx).addClass("-active");
    me.isShow = $wrapperId.hasClass("-open");

    me.toggle= function(){

    };

    me.open = function(){

    };

    me.close = function(){

    };

    function slidingOne(removeItem, activeItem, time){
        console.log("test")
        removeItem.removeClass("-active").addClass("-prevactive");
        activeItem.addClass("-active");

        setTimeout(function(){
            removeItem.removeClass("-prevactive");
        },time)
    }

    me.slideReset = function(){
        me.slideStop();
        $list.eq(me.activeIdx).removeClass("-active");
        me.activeIdx = 0;
        $list.eq(me.activeIdx).addClass("-active");
    };

    me.slideStop = function(){
        clearInterval(me.interval);
    };

    me.slidePlay =function(){
        var prevIdx=me.activeIdx;
        var nextIdx=me.activeIdx+1;
        var len = $list.length;
        

        me.interval = setInterval(function(){
            if(nextIdx==len){
                nextIdx=0;
            }
            
            slidingOne($list.eq(prevIdx), $list.eq(nextIdx),opt.delay);
            me.activeIdx = nextIdx;
            prevIdx = me.activeIdx;
            nextIdx = me.activeIdx+1;
        },opt.delay)
    }

    function init(){
        me.slidePlay();
    }

    init();

    return me;
}