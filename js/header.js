/**
 * Created by Fly on 2017-07-27.
 * header js 部分
 */

define(['./lib/jQuery-3.2.1.min'],function(){
    function Changelist(){
        var $more = $(".top-header").find(".h-content .h-c-nav .nav-list2 .more"),
            $moreList = $more.find(".m-list"),
            $click = false;

        $more.click(function(){
            $moreList.toggleClass("active");
        });
    }
    return Changelist;
});












