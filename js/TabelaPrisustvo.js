/*kod modula TabelaPrisustvo*/
window.onload = function(){    
    CrtanjeTabele.iscrtajTabelu(document.getElementById("divDOMelement"),data)
}


let CrtanjeTabele = (function(){ 
    
    var iscrtajTabelu = function(divDOMelement,data1){
        var newContent = document.createElement('h1')

        divDOMelement.style.display == "none"
        divDOMelement.style.display = "block"
    
        let tabelaEl = document.createElement("table") 
        divDOMelement.appendChild(tabelaEl) 

        //Kreiranje prvog reda
        let prviRed = document.createElement("tr")

        let sedmice=data1.prisustva.map(o => o.sedmica)
        ukupanBrSedmica=Math.max.apply(Math, sedmice)

        var imePrezime=document.createElement("th")
        imePrezime.textContent="Ime i prezime"
        prviRed.appendChild(imePrezime)

        var index=document.createElement("th")
        index.textContent="Index"
        prviRed.appendChild(index)
        tabelaEl.appendChild(prviRed)

        //dodajem sedmice
        for(var i=0;i<ukupanBrSedmica;i++){
            var s=document.createElement("th")
            if(i==ukupanBrSedmica-1)s.colSpan=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno
            s.textContent=("").padStart(i+1,"I");
            prviRed.appendChild(s)
        }

        var studenti=data1.studenti
        for(var i=0; i<studenti.length;i++){
            var red=dodajRed(tabelaEl)
            var red1=dodajRed(tabelaEl)
           
                dodajCeliju(red,studenti[i].ime).rowSpan="2"
                dodajCeliju(red,studenti[i].index).rowSpan="2"

            for(var j=0;j<ukupanBrSedmica;j++){
                var sedmiceZaTrenutnogStudenta=data1.prisustva.filter(o => o.index==studenti[i].index)
                //const newValues = values.flatMap((v) => [v *v, v*v*v, v+1]); 
                var pom1=sedmiceZaTrenutnogStudenta.find(s => s.sedmica==j+1)

                if(j!=ukupanBrSedmica-1)
                dodajCeliju(red,(pom1.predavanja+pom1.vjezbe)/(
                                 data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno
                                 )*100+"%").rowSpan="2"
                else{
                    for(var k=0;k<data1.brojPredavanjaSedmicno;k++){
                        dodajCeliju(red,"P "+(k+1)).style.height="30px"

                        if(pom1.predavanja>=k+1)dodajZelenuCeliju(red1,"").style.height="30px"
                        else dodajCrvenuCeliju(red1,"").style.height="30px"
                    }
                    for(var k=0;k<data1.brojVjezbiSedmicno;k++){
                        dodajCeliju(red,"V "+(k+1)).style.height="30px"
                        
                        if(pom1.vjezbe>=k+1)dodajZelenuCeliju(red1,"").style.height="30px"
                        else dodajCrvenuCeliju(red1,"").style.height="30px"
                    }
                }
            }
            
        }

    }
    
    var dodajRed = function(tabela){
        var red=document.createElement("tr")
        tabela.appendChild(red)
        return red
    }

    var dodajCeliju = function(red,vrijednost){
        var celija=document.createElement("td")
        celija.textContent=vrijednost
        red.appendChild(celija)
        return celija
    }

    var dodajZelenuCeliju = function(red,vrijednost){
        var celija=document.createElement("td")//.style.backgroundColor="lightgreen"
        celija.textContent=vrijednost
        celija.style.backgroundColor="lightgreen"
        red.appendChild(celija)
        return celija
    }

    var dodajCrvenuCeliju = function(red,vrijednost){
        var celija=document.createElement("td")//.style.backgroundColor="#eb5050"
        celija.textContent=vrijednost
        celija.style.backgroundColor="#eb5050"
        red.appendChild(celija)
        return celija
    }

    return{
        iscrtajTabelu: iscrtajTabelu
    }

}())

var data={
    "studenti": [{
        "ime": "Neko Nekic",
        "index": 12345
        },
        {
        "ime": "Drugi Neko",
        "index": 12346
        }
        ],
        "prisustva": [{
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 12345
        },
        {
        "sedmica": 1,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12346
        },
        {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 0,
        "index": 12345
        },
        {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 0,
        "index": 12346
        }
        ],
        "predmet": "Razvoj mobilnih aplikacija",
        "brojPredavanjaSedmicno": 2,
        "brojVjezbiSedmicno": 2        
}