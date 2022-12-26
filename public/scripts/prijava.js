var objectUsername = document.getElementById("username")
var objectPassword = document.getElementById("password")
var dugme = document.getElementById("dugme")

dugme.onclick = function(event){
    var obj = new Object()
    obj.username = objectUsername.value
    obj.password= objectPassword.value
    
    posaljiPodatke(obj, function(err,data){

        if(err != null){
            window.alert(err)
        }else{
            json=JSON.parse(data)
            window.alert(json.poruka)
        }
    })

}