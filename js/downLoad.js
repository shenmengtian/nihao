$('#downLoad').click(function (e) {
    e.preventDefault();
    fbq('track', 'AddToCart');
    window.location.href='https://vmlogin.com/VMLogin_setup_us.zip'
})
$('#toLogin').click(function (e) {
    e.preventDefault();
    let sub=sessionStorage.getItem('sub');
    let url=''
    if(sub!=='0'){
        url='https://m.vmlogin.com/member/login?s=ODM4NTYzNDE1&sub='+sub;
    }else{
        url='https://m.vmlogin.com/member/login?s=ODM4NTYzNDE1'
    }
    window.location.href=url;
})