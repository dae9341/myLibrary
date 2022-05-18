Vue.component('my-lib',{
    template:`<div class="my-lib px-5 text-[15px] flex flex-wrap gap-[10px]">
                <dl class="my-lib-card w-[50%] relative bg-slate-100	rounded-lg text-gray-900 p-[15px]" v-for="item in this.mylibdata">
                    <dt class="font-bold text-[18px]">{{item.title}}</dt>
                    <dd class="mt-[10px]">
                        <span class="label text-[12px] bg-rose-200 rounded-[10px] inline-flex px-[2px] px-[5px]" v-if="item.channel =='pc'|| item.channel =='all'">pc</span>
                        <span class="label text-[12px] bg-green-200 rounded-[10px] inline-flex px-[2px] px-[5px]" v-if="item.channel =='mobile'|| item.channel =='all'">mobile</span>
                        <p class="h-[68px] overflow-hidden">{{item.description}}</p>
                        <a v-bind:href="item.url" class="flex items-center text-gray-500 after:content-[''] after:block after:ml-[5px] after:w-[8px] after:h-[8px] after:border-gray-500	after:border-t-[1px] after:border-r-[1px] after:rotate-45">바로가기</a>
                    </dd>
                </dl>
            </div>`,
    methods:{
        
    },
    props:{
        mylibdata:Array
    }
});

function myLibList (wrapperId,option){
    var opt = $.extend({
        data:[],
    },option);


    new Vue({
        el:"#test",
        data:{
            mylibdata:opt.data
        },
        mounted:function(){
            // console.log(this.mylibdata)
        },
    })
}