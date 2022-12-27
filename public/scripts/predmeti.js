
var dugme=document.getElementById("dugme")

    dugme.onclick=function(){
        PoziviAjax.postLogout(function(err,data){

            if(err != null){
                window.alert(err)
            }else{
                //redirektujem se nazad na pocetnu stranicu prijava.html
                window.location.href="http://localhost:3000/prijava.html"
            }
        })
    }


    var meni=document.getElementById('meni')
    var testni = document.createElement("h2")
    testni.textContent="TESTNO"
    meni.appendChild(testni)
