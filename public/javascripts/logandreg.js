$('#login').on('click',function () {
    $.ajax(

    )
})
function popupWindow(val){
    var $pageW = $(window).width();
    var $pageH = $(window).height();
    var $pageH2 = $(window).height()>$(document).height() ?$(window).height() : $(document).height();
    var $hintWindow = $('<div id="hit-window" style="left:'+($pageW-300)/2+'px;top:'+($pageH-180)/2+'px">\
            <p class="top">消息</p>   \
            <p class="middle">'+val+'</p>\
            <p class="bottom">确定</p> \
        </div>');

    var $mark = $('<div id="mark" style="width:'+$pageW+'px;height:'+$pageH2+'px"></div>')
    $('body').prepend($hintWindow,$mark);
    $('#hit-window .bottom').on('click',function(){
        $('#hit-window').remove();
        $('#mark').remove();
    })
}