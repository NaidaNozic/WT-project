let posaljiPodatke= function(objekat,funckija){
    console.log("AJAX")
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                funckija(null,ajax.response)
            }
            else if(ajax.readyState == 4){
                //desio se neki error
                funckija(JSON.parse(ajax.response).data, null)
            }
        }
        ajax.open("POST", "http://localhost:3000/login/1", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        forSend=JSON.stringify(objekat)
        ajax.send(forSend)

}
