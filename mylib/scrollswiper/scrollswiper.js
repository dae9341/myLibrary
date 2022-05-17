function scrollswiper(wrapperId,option){
    var me = this;
    var opt = $.extend({
        initIdx:3,
        swiperWrapper:".scrollswiper-swiper",
        listItem:".scrollswiper-swiper-item",
        counter:".scrollswiper-page",
        dot:".scrollswiper-dot",
        isCounter:true, // 카운터 사용여부
        isDot:true,
        perView:2
    },option);

    let $wrapperId = $(wrapperId);
    let $swiperWrapper = $(opt.swiperWrapper);
    let $listItem = $(opt.listItem);
    let $counter = $(opt.counter);
    let $dot = $(opt.dot);

    opt.perView = opt.perView <= 1 ? 1:opt.perView;
    let swiper_len = opt.perView > 1 ? $listItem.length-opt.perView+1 : $listItem.length; // 총 개수
    let observer = new IntersectionObserver(entries=>{
        entries.forEach((item,idx)=>{
            if(item.isIntersecting){
                let nowIdx = $(item.target).index();
                if(me.originIndex > nowIdx){
                    me.direction="down"
                }else if(me.originIndex < nowIdx){
                    me.direction="up"
                }else{
                    return;
                }


                me.originIndex = nowIdx;
                console.log(me.direction);

                if(opt.perView > 1){
                    me.index = me.direction=="up"? me.originIndex-opt.perView+1 : me.originIndex;
                    
                }else{
                    me.index = me.originIndex;
                }
                pageSet();
            }
        })
    }, {
        root:$swiperWrapper[0],
        threshold: 0.5
    });

    //관찰대상 등록
    $listItem.each(function(){
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
        $counter.html('<span>'+page+' / '+swiper_len+'</span>');
    }

    function dotSet(index){
        if(!opt.isDot)// 카운터 사용여부에따라 체크
            return; 
        $dot.find('span').eq(me.index).addClass('-on').siblings('span').removeClass('-on');
    }

    me.init = function(){
        me.index=opt.initIdx; // 인덱스번호 세팅
        me.originIndex = opt.initIdx;
        opt.isCounter ? $counter.show():$counter.hide();
        me.slideTo(me.index);

        let listItemWidth = (100/opt.perView)+'%';
        $listItem.css('flex','0 0 '+listItemWidth);
         

        if(opt.isDot){
            let dotHTML = "";
            for(let i=0; i < swiper_len; i++){
                dotHTML+="<span></span>";
            }
            $dot.html(dotHTML);
        }else{
            $dot.hide();
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
        let target = $listItem.eq(index)[0];
        if(!target){
            return;
        }
        $swiperWrapper.animate({scrollLeft:target.offsetLeft},500);
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