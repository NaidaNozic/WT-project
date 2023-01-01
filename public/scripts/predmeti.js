var currentPrisustvoData=""
var trenutnaSedmica1=-1
var prisustvo//= TabelaPrisustvo(div,JSON.parse(data))

function postaviPrisustvoGlobal(tabela){
    prisustvo = tabela
}

function postaviTrenutnoPrisustvoPredmeta(data){
    currentPrisustvoData=data
}
function postaviTrenutnuSedmicu(sedmica){
    trenutnaSedmica1=sedmica
}
/*
function azurirajData(){
    naziv=currentPrisustvoData.predmet
    PoziviAjax.getPredmet(naziv,function(err,data){
        
        if(err != null){
            window.alert(err)
        }else{
            currentPrisustvoData=JSON.parse(data)
            console.log("NOVOO U predmeti.js")
            console.log(currentPrisustvoData)
            //postaviTrenutnoPrisustvoPredmeta(JSON.parse(data))
            prisustvo.postaviData(data)
        }
    })
    return currentPrisustvoData
}*/

function crveneClick(button){
    button.style.backgroundColor="lightgreen"
    button.className="zelena"
    button.addEventListener("click", function(event){ zeleneClick(event.target); },false)
}

function ajaxPrisustvoPoziv(naziv,index,prisustvo){

    PoziviAjax.postPrisustvo(naziv,index,prisustvo,function(err,data){

        if(err != null){
            window.alert(err)
        }else{
            prisustvo.postaviData(data)
        }

    })
}

function zeleneClick(button){
    button.style.backgroundColor="#eb5050"
    button.className="crvena"
    button.addEventListener("click", function(event){ crveneClick(event.target) },false)

    var indexReda=button.parentNode.rowIndex //preko ovoga nalazim index studenta
    var indexPredavanja=button.cellIndex //preko ovoga znam dodajem li prisustvo predavanjima ili vjezbama
    var predavanja1=0
    var vjezbe1=0

    var indexStudenta=currentPrisustvoData.studenti[indexReda/2-1].index
    var nazivPredmeta=currentPrisustvoData.predmet

    if(indexPredavanja+1<=currentPrisustvoData.brojPredavanjaSedmicno){
        predavanja1=-1
    }else{
        vjezbe1=-1
    }
    //azurirano prisustvo:
    var prisustvo = {
        "sedmica": trenutnaSedmica1,
        "predavanja": predavanja1,
        "vjezbe": vjezbe1
    }
    ajaxPrisustvoPoziv(nazivPredmeta,indexStudenta,prisustvo)
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
            postaviPrisustvoGlobal(TabelaPrisustvo(div,JSON.parse(data)))
            //let prisustvo = TabelaPrisustvo(div,JSON.parse(data))
            postaviTrenutnoPrisustvoPredmeta(JSON.parse(data))
            postaviTrenutnuSedmicu(prisustvo.trenutnaSedmica)
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
