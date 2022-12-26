let posaljiPodatke= function(objekat,funckija){
        var ajax = new XMLHttpRequest();

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
