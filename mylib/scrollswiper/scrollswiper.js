function scrollswiper(wrapperId,option){
    var me = this;
    var $wrapperId = $(wrapperId);
    var opt = $.extend({
        swiperDom:".scrollswiper-swiper",
        startDom:".scrollswiper-swiper-item",
        counterDom:".scrollswiper-page"
    },option);

    me.index=0; // 인덱스번호 세팅
    let scrollWidth= $(".scrollswiper-swiper-item").width();
    let nowNumber = 1; 

    function counterSet(event){

        // $(opt.counterDom).append('<span class="">'+nowNumber+'</span>')
        me.index=Math.round($(event.currentTarget).scrollLeft()/scrollWidth);
        console.log(me.index);
    }


    // 스크롤 이벤트
    $(opt.swiperDom).scroll(function(e){ 
        counterSet(e);
    });

    return me;
}