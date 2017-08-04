/**
 * Created by Fly on 2017-07-31.
 * Author : Print
 * QQ : 2662256509
 */

require(["./header"],function(header) {
    //执行Header部分代码
    header();


    //campus部分
    var $win = $(window),
        $main = $(".main"),
        $campus = $main.find(".campus");

    //campus1
    (function(){
        //窗口被改变
        $(window).resize(function(){
            $campus.eq(0).height($(window).height()-$main.offset().top);
        });
        $(window).resize();
    })();


    //campus3
    (function($win){
        var $campus3 = $campus.eq(2),
            $cam_show = $campus3.find(".cam-show"),
            $cam_list = $campus3.find(".cam-list"),
            $cam_li = $cam_list.find(".item"),
            $length = $cam_li.length,
            $index = 0,  //当前索引
            $timer;     //储存自动切换的定时器

        var $step = -324;   //cam-show背景位置步长

        //item点击切换 cam-show背景位置
        $cam_li.click(function(){
            var This = $(this);
            Change(This.index());
        });

        //自动切换
        $timer = setInterval(autoChange, 3500);
        //暂停和继续自动切换
        $cam_list.hover(function(){
            //暂停
            clearInterval($timer);
        },function(){
            //继续
            $timer = setInterval(autoChange, 3500);
        });

        //窗口发生改变
        $win.resize(function(){
            $(this).outerWidth()<600?$step = -280:$step = -324;
            Change($index);
        });
        $win.resize();

        //自动切换
        function autoChange(){
            var index = $index+1;
            index>=$length?index=0:index;
            Change(index);
        }
        //改变items和cam-show, 传入一个索引
        function Change(index){
            $cam_li.eq(index).addClass("activity").siblings().removeClass("activity");
            $cam_show.css("backgroundPositionY",$step*($index = index));
        }
    })($win);

    //goto跳转
    (function(){
        var $goto = $campus.find(".goto");

        $goto.click(function(){
            var $camp = $campus.eq($(this).index('.goto')+1);
            $("body,html").animate({
                scrollTop : $camp.offset().top-90,
            },800,"");
        });
    })();

});











