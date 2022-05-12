function calendar (inputId, option){
    var me = this;
    var date = new Date();

    var opt = $.extend({
        nowYear:date.getFullYear(), // 달력에 표시할 연도
        nowMonth:date.getMonth()+1, // 달력에 표시할 월
        yearsCount:4, // 현재 연도 포함 몇개의 연도가 노출될지 설정
        maxYear:date.getFullYear(), // 최대연도값(일반적으로 현재 연도 적용함)
        monthName:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], // 월별 달력에 노출될 명칭
        mode:"start" // start, end [시작일,마지막일 체크]
    },option);


    me.$inputId = $(inputId);


    function init(){

    };

    function calendarPaint(){
        var html =`
            <div class="calendar">

            </div>
        `
    };


    return me;
}