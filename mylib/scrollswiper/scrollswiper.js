function scrollswiper(wrapperId,option){
    var me = this;
    var $wrapperId = $(wrapperId);
    var opt = $.extend({
        initIdx:0,
        swiperWrapper:".scrollswiper-swiper",
        listItem:".scrollswiper-swiper-item",
        counter:".scrollswiper-page",
        dot:".scrollswiper-dot",
        isCounter:true, // 카운터 사용여부
        isDot:true
    },option);

    let swiper_len = $(opt.listItem).length; // 총 개수
    let observer = new IntersectionObserver(entries=>{
        entries.forEach(item=>{
            if(item.isIntersecting){
                me.index = $(item.target).index();
                pageSet();
            }
        })
    }, {
        root:$(opt.swiperWrapper)[0],
        threshold: 0.5
    });

    //관찰대상 등록
    $(opt.listItem).each(function(){
        observer.observe($(this)[0]);
    })

    function pageSet(){
        me.page = me.index+1; // 현재 page 설정
        counterPaint(me.page);
        dotSet(me.index);
    };

    function counterPaint (page){
        if(!opt.isCounter)// 카운터 사용여부에따라 체크
            return; 
        $(opt.counter).html('<span>'+page+' / '+swiper_len+'</span>');
    }

    function dotSet(index){
        if(!opt.isDot)// 카운터 사용여부에따라 체크
            return; 
        $(opt.dot).find('span').eq(me.index).addClass('-on').siblings('span').removeClass('-on');
    }

    me.init = function(){
        me.index=opt.initIdx; // 인덱스번호 세팅
        opt.isCounter ? $(opt.counter).show():$(opt.counter).hide()
         

        if(opt.isDot){
            let dotHTML = "";
            for(let i=0; i < swiper_len; i++){
                dotHTML+="<span></span>";
            }
            $(opt.dot).html(dotHTML);
        }else{
            $(opt.dot).hide();
        }

        pageSet()
        
    };

    /* 0번으로 이동 */
    me.reset = function(){
        me.index=0; // 인덱스번호 세팅
        me.slideTo(me.index);
        pageSet()
    };

    /* 해당 인덱스로 이동 
        index: {Number} 인덱스번호
    */
    me.slideTo = function(index){
        let target = $(opt.listItem).eq(index)[0];
        if(!target){
            return;
        }
        $(opt.swiperWrapper).animate({scrollLeft:target.offsetLeft},500);
        pageSet(); 
    };

    me.init();

    return me;

    
/* 
   // 스크롤 이벤트ver
    function pageSet(event){

        // $(opt.counterDom).append('<span class="">'+nowNumber+'</span>')
        me.index=Math.round($(event.currentTarget).scrollLeft()/scrollWidth);
        console.log(me.index);
    } 
   $(opt.swiperDom).scroll(function(e){ 
        pageSet(e);
    });
 */
}