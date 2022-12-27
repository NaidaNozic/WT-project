let posaljiPodatke = function(objekat,funckija){
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                funckija(null,ajax.response)
            }
            else if(ajax.readyState == 4){
                //desio se neki error
                funckija(ajax.statusText,null)
            }
        }
        ajax.open("POST", "http://localhost:3000/login", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        forSend=JSON.stringify(objekat)
        ajax.send(forSend)
}

let login = function(objectUsername,objectPassword){
    
    var obj = new Object()
    obj.username = objectUsername.value
    obj.password= objectPassword.value
    
    posaljiPodatke(obj, function(err,data){

        if(err != null){
            window.alert(err)
        }else{
            json=JSON.parse(data)
            //redirektujem se na stranicu predmeti.html
            window.location.href=json.redirect_path
        }
    })
}

let logoutFunction = function(){
    var ajax = new XMLHttpRequest()
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            json=JSON.parse(ajax.response)
            //redirektujem se nazad na pocetnu stranicu prijava.html
            window.location.href=json.redirect_path
        }
        else if(ajax.readyState == 4){
            //desio se neki error
            console.log(ajax.statusText)
        }
    }
    ajax.open("POST", "http://localhost:3000/logout", true)
    ajax.send()
}
