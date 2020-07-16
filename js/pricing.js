$('#showContact').click(function (e) {
    e.preventDefault();
    $('.contact').animate({
        right:"2rem"
    })
})
$('.contact').find('a').click(function (e) {
    e.preventDefault();
    $('.contact').animate({
        right:"-320px"
    })
})

$('#toCreate').click(function (e) {
    e.preventDefault();
    $('.register').fadeIn();
})
// $('#cancel').click(function (e) {
//     e.preventDefault();
//     $('.register').fadeOut();
// })
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
                if(res.code===200){
                    fbq('track', 'Lead');
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
function isEmail(str) {
    var re=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}


$('.buy').click(function (e) {
    e.preventDefault();
    let flag=$(this).data('flag');
    sessionStorage.setItem('type',flag);
    window.location.href='order.html'
})