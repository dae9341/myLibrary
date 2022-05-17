function selectBox(wrapperId,option) {
    var me = this;
    var opt = $.extend({
        isDisabled: false
    },option);

    var $button = $(wrapperId).find(".m-selectBox__button > a"); // 셀렉트 옵션 열고닫는 버튼
    var $optionList = $(wrapperId).find(".m-selectBox__options"); // 옵션 리스트

    var id = wrapperId.replace("#","");  // 꼭지점 id 추출
    var optionName = id+"Option"; // 옵션네임
    var $optionsRadio = $optionList.find("li > label > input[name='"+optionName+"']:radio"); // 라디오버튼
    var isOpen = false; // 옵션리스트 오픈 여부

    function init(){
        selectBoxDisabled();

        // 셀렉트 클릭
        $button.on("click",function (e) {
            if(!opt.isDisabled){
                me.toggle();
            }else{
                return;
            }
        });

        // 셀렉트 닫기
        $(document).click(function (e) {
            if ($(e.target).parents(wrapperId).length > 0 && !$(e.target).find("input[type='radio']").prop("checked"))  { // select영역이면서 선택된 ITEM이 아닐경우 닫지않음. => change이벤트에서 닫음 처리  
                return;
            }else{
                me.close();
            }

        });

        // 옵션 변경시 value, index 값
        $optionsRadio.on("change",function () {
            var $this_parents_li = $(this).parents("li");

            if($this_parents_li.hasClass("-disabled")){
                me.select(0); // 초기화
            }else{
                me.select($this_parents_li.index());
                me.close();
            }
        });
    }

    function selectBoxDisabled(){
        if(opt.isDisabled){
            $(wrapperId).addClass("-disabled");
        }else{
            $(wrapperId).removeClass("-disabled");
        }
    }


    /*
    // 블러
    $button.on("blur",function () {
        setTimeout(function () {
            if(!keepFocus){
                me.close();
            }
            keepFocus=false;
        },100);
    });*/

    // 옵션리스트 열기
    me.open = function () {
        $button.addClass("-on");
        $optionList.addClass("-on");
        isOpen = true;
    };
    
    // 옵션리스트 닫기
    me.close = function () {
        $button.removeClass("-on");
        $optionList.removeClass("-on");
        isOpen = false;
    };

    // 옵션리스트 토글
    me.toggle = function () {
        if(isOpen){
            me.close();
        }else{
            me.open();
        }
    };

    // 선택 (li의 인덱스 값으로 선택함)
    me.select = function (idx) {
        var $selectedRadio = $optionList.find("li").eq(idx).find("label>input[name='"+optionName+"']:radio" );
        $selectedRadio.prop("checked",true);
        me.value = $selectedRadio.val();
        me.index = idx;

        $button.text(me.value);
        console.log(me.value,me.index,"test");
    };

    // 활성화 변경
    me.toggleEnabled = function(value){
        switch (value) {
            case "enabled":
                opt.isDisabled = false;
                break;
            case "disabled":
                opt.isDisabled = true;
                break;
            default:
                break;
        }
        selectBoxDisabled();
    };

    init();
    return me;
}