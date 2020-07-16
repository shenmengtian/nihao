$(document).ready(function () {
    if($(document.body).width()<1120){
        window.location.href='https://us.vmlogin.com/mVMLOGIN/index.html'
    }
    let notify=getQueryString('notify');
    let ref=getQueryString('ref');
    if(ref!==null){
        localStorage.setItem('ref',ref);
        $.ajax({
            type:"POST",
            url:'https://us.vmlogin.com/api/forum_click.php',
            data:{ref:ref},
            dataType:'json',
            success:function (ref) {
                
            }
        })
    }
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        if(notify==='success'){
            window.location.href='https://us.vmlogin.com/mVMLOGIN/index.html?notify=success'
        }else{
            window.location.href='https://us.vmlogin.com/mVMLOGIN/index.html'
        }
    } else {
        if(notify==='success'){
            swal({
                icon: "success",
                text: "Payment successful",
            });
            let ref=localStorage.getItem('ref');
            if(ref!==null){
                $.ajax({
                    type:"POST",
                    url:'https://us.vmlogin.com/api/forum_pay.php',
                    data:{ref:ref},
                    dataType:'json',
                    success:function (ref) {
                        
                    }
                })
            }
        }
    }
    let sub=getQueryString('sub');          //用户推广码
    if(sub!==null){
        sessionStorage.setItem('sub',sub);
    }else{
        sessionStorage.setItem('sub','0');
    }
});
$(window).resize(function() {
    if($(document.body).width()<1120){
        window.location.href='https://us.vmlogin.com/mVMLOGIN/index.html'
    }
});
function getQueryString(name){
    var reg =new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i');
    var r = window.location.search.substr(1).match(reg);
    if(r !=null){
        return unescape(r[2]);
    }
    return null;
}