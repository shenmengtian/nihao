$(document).ready(function () {
    if(getQueryString('refer')==='vmloginpay'){      //后台过来的订单
        let flag=getQueryString('type');
        sessionStorage.setItem('type',flag);
        let account=getQueryString('account');
        switch (flag){
            case 'solo' :
                $('.solo').css({display:'block'}); break;
            case 'team' :
                $('.team').css({display:'block'}); break;
            case 'scale' :
                $('.scale').css({display:'block'}); break;
            default :
                window.location.href='pricing.html';
        }
        $('#payAccount').val(account);

    }else{
        let flag=sessionStorage.getItem('type');    //网页直接过来的订单
        console.log(flag);
        switch (flag){
            case 'solo' :
                $('.solo').css({display:'block'}); break;
            case 'team' :
                $('.team').css({display:'block'}); break;
            case 'scale' :
                $('.scale').css({display:'block'}); break;
            default :
                window.location.href='pricing.html';
        }
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

$('#toRegister').click(function (e) {
    e.preventDefault();
    $('.register').fadeIn();
})
$('#cancel').click(function (e) {
    e.preventDefault();
    $('.register').fadeOut();
    $('#account').val('');
    $('#pwd').val('');
    $('#cPwd').val('');
})
$('#create').click(function (e) {
    let _this=$(this);
    e.preventDefault();
    let account=$('#account').val();
    let password=$('#pwd').val();
    let cpassword=$('#cPwd').val();
    if(isEmail(account)){

    }else{
        swal({
            icon: "error",
            text: "Please enter the correct email address",
        });
        return;
    }
    if(password.length<6){
        swal({
            icon: "error",
            text: "Your password is too short (min. 6 characters)",
        });
    }else if(password!==cpassword){
        swal({
            icon: "error",
            text: "Two input password must be consistent",
        });
    }else{
        $(this).css({display:'none'});
        $('#creating').css({display:'inline-block'});
        let data={};
        let sub=sessionStorage.getItem('sub')
        if(sub!=='0'){
            data={account:account,password:password,sub:sub}
        }else{
            data={account:account,password:password}
        }
        $.ajax({
            type:"POST",
            url:'https://us.vmlogin.com/api/user_reg.php',
            data:data,
            dataType:'json',
            success:function (res) {
                console.log(res);
                if(res.code===200){
                    fbq('track', 'CompleteRegistration');
                    window.location.href='https://us.vmlogin.com/registerSuccess.html'
                }else{
                    swal({
                        icon: "error",
                        text: res.msg,
                    });
                }
                _this.css({display:'inline-block'});
                $('#creating').css({display:'none'});
            }
        })
    }
})


$('#pay').click(function (e) {
    let _this=$(this);
    e.preventDefault();
    fbq('track', 'InitiateCheckout');
    let account=$('#payAccount').val();
    if(isEmail(account)){
        $(this).css({display:'none'});
        $('#paying').css({display:'inline-block'});
        let type=sessionStorage.getItem('type');
        $.ajax({
            type:"POST",
            url:'https://us.vmlogin.com/api/user_order.php',
            data:{account:account,type:type},
            dataType:'json',
            success:function (res) {
                if(res.code===200){
                    window.location.href='https://us.vmlogin.com/paypal/payment.php?orderid='+res.data.oid;
                }else{
                    swal({
                        icon: "error",
                        text: res.msg,
                    });
                }
                _this.css({display:'inline-block'});
                $('#paying').css({display:'none'});
            }
        })
    }else{
        swal({
            icon: "error",
            text: "Please enter the correct email address",
        });
    }
})

$('#paying-card').click(function (e) {
    let _this=$(this);
    e.preventDefault();
    let account=$('#payAccount').val();
    fbq('track', 'InitiateCheckout');
    if(isEmail(account)){
        $(this).css({display:'none'});
        $('#paying').css({display:'inline-block'});
        let type=sessionStorage.getItem('type');
        $.ajax({
            type:"POST",
            url:'https://us.vmlogin.com/api/user_order.php',
            data:{account:account,type:type},
            dataType:'json',
            success:function (res) {
                if(res.code===200){
                    window.location.href='https://us.vmlogin.com/paypal/payment.php?orderid='+res.data.oid;
                }else{
                    swal({
                        icon: "error",
                        text: res.msg,
                    });
                }
                _this.css({display:'inline-block'});
                $('#paying').css({display:'none'});
            }
        })
    }else{
        swal({
            icon: "error",
            text: "Please enter the correct email address",
        });
    }
})


function isEmail(str) {
    var re=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}