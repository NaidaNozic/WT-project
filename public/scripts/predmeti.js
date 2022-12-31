//svi td koji imaju klasu .crvena i .zelena se trebaju moci selektovat
function crveneClick(button){
    button.style.backgroundColor="lightgreen"
    button.className="zelena"
    button.addEventListener("click", function(event){
        zeleneClick(event.target);
    },false)
}

function zeleneClick(button){
    button.style.backgroundColor="#eb5050"
    button.className="crvena"
    button.addEventListener("click", function(event){
        crveneClick(event.target);
    },false)
}

function postaviClickableListElements(){
    var crvene=document.getElementsByClassName("crvena")
    var zelene=document.getElementsByClassName("zelena")

    for (let c of crvene) {
        c.addEventListener("click", function(event){
            crveneClick(event.target);
        },false);
    }

    for (let c of zelene) {
        c.addEventListener("click", function(event){
            zeleneClick(event.target);
        },false);
    }
}
function buttonsControl(button) {
    PoziviAjax.getPredmet(button.innerHTML,function(err,data){

        if(err != null){
            window.alert(err)
        }else{
            let div = document.getElementById("container")
            let prisustvo = TabelaPrisustvo(div,JSON.parse(data))
            prisustvo.iscrtajTabelu()
            postaviClickableListElements()
        }
    })
}

var predmeti1=document.getElementsByTagName("li")
window.onload=function(){
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
    
for (let p of predmeti1) {
    p.addEventListener("click", function(event){
        buttonsControl(event.target);
    },false);
  }
}
