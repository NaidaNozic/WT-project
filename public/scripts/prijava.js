window.onload =function(){
var username=document.getElementById("username")
var password=document.getElementById("password")
let dugme=document.getElementById("dugme")

dugme.onclick = function(){

    PoziviAjax.postLogin(username.value,password.value,function(err,data){
        if(err != null){
            window.alert(err)
        }else{
            window.location.href="http://localhost:3000/predmeti.html"
            //window.alert(JSON.parse(JSON.stringify(data)))
        }
    })
}
}


