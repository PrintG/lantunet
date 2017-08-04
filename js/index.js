/**
 * Created by Fly on 2017-07-27.
 * Author : Print
 * QQ : 2662256509
 */
require(["./header"],function(header){
    //执行Header部分代码
    header();

    /****** Main ******/
    (function(){
        var $main = $(".main");

        //Banner
        (function(){
            var $Banner = $main.find(".banner-wrap");

            //Play vedio
            var $vedio = (function(){
                var $banner_play = $Banner.find(".banner .item1 .b-play .b-p-vedio"),
                    $vedio = $banner_play.find("video");

                $banner_play.one("click",function(){
                    $vedio.removeClass("hide").siblings(".play-btn").addClass("hide");
                    $vedio[0].play();
                });
                return $vedio;
            })();

            //change Banner
            (function($vedio){
                var $items = $Banner.find(".banner .item"),
                    $tab = $Banner.find(".tab-list .tab-btn"),
                    $index = 0; //当前显示的轮播

                //tab按钮点击切换轮播
                $tab.bind("click", $vedio, function (d) {
                    //视频播放状态下无法切换轮播
                    if((!d.data)||d.data[0].paused) {
                        var This = $(this);
                        change(function(){
                            $index = This.index();
                        });
                    }
                });

                //自动轮播
                var timer = setInterval(autoPlay, 3500);
                function autoPlay(){
                    if((!$vedio)||$vedio[0].paused){
                        change(function(){
                            $index++;
                            $index %= 3;
                        });
                    }
                }
                //播放-暂停
                $Banner.hover(function(){
                    clearInterval(timer);
                },function(){
                    clearInterval(timer);
                    timer = setInterval(autoPlay, 3500);
                });

                function change(fn){
                    fn();
                    $tab.eq($index).addClass("active").siblings().removeClass("active");
                    $items.eq($index).addClass("active").siblings().removeClass("active");
                }

                //离开-进入 当前页面
                var $doc = $(document),
                    $docTitle = $doc.prop("title"),
                    $tTimer;
                $doc.on('visibilitychange',function(){
                    clearTimeout($tTimer);
                    var value = "w(ﾟДﾟ)w页面崩溃啦~";
                    if(!$(document)[0].hidden){
                        value = "噫！ 又好了";
                        $tTimer = setTimeout(function(){
                            $doc.prop("title", $docTitle);
                        },1500);
                        timer = setInterval(autoPlay, 3500);
                    }else{
                        clearInterval(timer);
                    }
                    $doc.prop("title", value);
                });

            })($vedio);
        })();

        //Case
        (function(){
            var $case_wrap = $main.find(".case-wrap"),
                $case_btn = $case_wrap.find(".case-btn"),
                $case_show = $case_wrap.find(".case-show"),
                $case_list = $case_show.find(".case-show-list"),
                $case_dot_list = $case_show.find(".dot-list"),
                $case_dot = $case_dot_list.find("i"),
                $case_items = $case_list.find(".item"),
                $length = $case_items.length,
                $index = Math.floor($case_items.length/2),  //居中显示的元素的索引
                $dotIndex = $index,     //用来改变dot的索引
                isClick = null,   //用来限制点击速度
                step = -240, //储存步长
                $_left = parseFloat($case_list.css("left"));    //list初始left值

            var $c_l_left = [-480,-326,-510,-795];   //储存不同屏幕list的left值

            $(window).resize(function(){
                var winWidth = $(this).outerWidth();

                //改变屏幕宽度调整到最佳的步长和list的居中对齐
                //分辨率宽 大于 1200
                step = -240;
                $c_l_left[4] = $c_l_left[0];
                //分辨率宽 小于等于 1200
                if(winWidth<=1200){
                    step = -173;
                    $c_l_left[4] = $c_l_left[1];
                }
                //分辨率宽 小于等于 899
                if(winWidth<=899) {
                    step = -180;
                    $c_l_left[4] = $c_l_left[2];
                }
                //分辨率宽 小于等于 599
                if(winWidth<=599){
                    step = -200;
                    $c_l_left[4] = $c_l_left[3];
                }
                $case_list.css("left",$c_l_left[4]);
            });
            //初始化一次
            $(window).resize();

            //按钮的点击事件
            $case_btn.click(function(){
                //限制点击速度不能超过800ms
                if(isClick===null || new Date() - isClick > 800) {
                    $_left = parseFloat($case_list.css("left"));
                    //检测点的是哪个按钮
                    if ($(this).index($case_btn)) {
                        //right
                        $index++;

                        $dotIndex++;
                        $dotIndex %= $length;

                        changeClass();
                        $case_list.animate({
                            left : $_left + step,
                        },500,function(){
                            loopChange(5, "append");
                        });

                    } else {
                        //left
                        $index--;

                        $dotIndex--;
                        if($dotIndex<0) $dotIndex=$length-1;

                        changeClass();
                        $case_list.animate({
                            left : $_left + -step,
                        },500,function(){
                            loopChange(3, "prepend");
                        });
                    }
                    isClick = new Date();
                }
            });

            //改变item的类名
            function changeClass(){
                var $left = $index-1,
                    $right = $index+1;

                $case_items.removeClass("middleify sideify");
                if($left<0) left = $length - 1;
                if($right>=$length) $right = 0;
                $case_items.eq($index).addClass("middleify");
                $case_items.eq($left).addClass("sideify");
                $case_items.eq($right).addClass("sideify");

                $case_dot.eq($dotIndex).addClass("dot-s").siblings().removeClass("dot-s");
            }

            //循环切换item
            //  num  当index等于某个数时让index返回到原来的值
            //  type 添加的方式, "append"   "prepend"
            function loopChange(num, type){
                if($index===num) $index = 4;    //等于中间值(如果增加了item,请修改这里)
                type === "append"?$case_list.append($case_items.eq(0)):$case_list.prepend($case_items.eq($length-1));

                $case_items = $case_list.find(".item");
                changeClass();
                $case_list.css("left", $_left);
            }
        })();
    })();
});













