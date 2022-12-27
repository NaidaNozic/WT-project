
var username=document.getElementById("username")
var password=document.getElementById("password")
let dugme=document.getElementById("dugme")


dugme.onclick = function(){
    console.log("HAAAAA")
    PoziviAjax.postLogin(username,password,function(err,data){
        console.log("LOOOOO")
        if(err != null){
            window.alert(err)
        }else{
            json=JSON.parse(data)
            //redirektujem se na stranicu predmeti.html
            window.location.href="http://localhost:3000/predmeti.html"
            //window.alert("USPJELOO")
        }
    })
}

