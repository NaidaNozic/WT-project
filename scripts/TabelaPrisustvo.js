

export let TabelaPrisustvo = function(divDOMelement,data1){ 

    let iscrtajTabelu = function(){

        divDOMelement.style.display == "none"
        divDOMelement.style.display = "block"

        if(!provjeraValidnostiPodataka(divDOMelement,data1))return

        var naslov=document.createElement("h2")
        naslov.textContent=data1.predmet
        divDOMelement.appendChild(naslov)

        var podnaslov1=document.createElement("h3")
        podnaslov1.textContent="Broj predavanja sedmicno: "+data1.brojPredavanjaSedmicno
        divDOMelement.appendChild(podnaslov1)

        var podnaslov2=document.createElement("h3")
        podnaslov2.textContent="Broj vježbi sedmicno: "+data1.brojVjezbiSedmicno
        divDOMelement.appendChild(podnaslov2)
    
        let tabelaEl = document.createElement("table") 
        divDOMelement.appendChild(tabelaEl) 

        //Kreiranje prvog reda
        let prviRed = document.createElement("tr")

        let sedmice=data1.prisustva.map(o => o.sedmica)
        var ukupanBrSedmica=Math.max.apply(Math, sedmice)

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
        dodajDugmadi()
    }

    let dodajDugmadi=function(){
        var dugmeDesno=document.createElement("button")
        dugmeDesno.innerHTML='<i class="fa-solid fa-arrow-right"></i>'

        var dugmeLijevo=document.createElement("button")
        dugmeLijevo.innerHTML='<i class="fa-solid fa-arrow-left"></i>'

        dugmeDesno.style.margin="5px"

        divDOMelement.appendChild(dugmeDesno)
        divDOMelement.appendChild(dugmeLijevo)
    }
    
    let dodajRed = function(tabela){
        var red=document.createElement("tr")
        tabela.appendChild(red)
        return red
    }

    let dodajCeliju = function(red,vrijednost){
        var celija=document.createElement("td")
        celija.textContent=vrijednost
        red.appendChild(celija)
        return celija
    }

    let dodajZelenuCeliju = function(red,vrijednost){
        var celija=document.createElement("td")//.style.backgroundColor="lightgreen"
        celija.textContent=vrijednost
        celija.style.backgroundColor="lightgreen"
        red.appendChild(celija)
        return celija
    }

    let dodajCrvenuCeliju = function(red,vrijednost){
        var celija=document.createElement("td")//.style.backgroundColor="#eb5050"
        celija.textContent=vrijednost
        celija.style.backgroundColor="#eb5050"
        red.appendChild(celija)
        return celija
    }

    let provjeraValidnostiPodataka = function(divDOMelement,data){
        if((data.prisustva.find(o => o.predavanja>data.brojPredavanjaSedmicno || o.vjezbe>data.brojVjezbiSedmicno)!=null) ||
            data.prisustva.find(o => o.predavanja<0 || o.vjezbe<0)){
            divDOMelement.textContent="Podaci o prisustvu nisu validni!"
            return false
        }
        //Prisustvo za studenta koji nije u listi studenata
        for(var i=0;i<data.prisustva.length;i++){
            if(data.studenti.find(o => o.index==data.prisustva[i].index)==null){
                divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                return false
            }
            if(data.prisustva[i].vjezbe==0 && data.prisustva[i].predavanja==0){
                //data.prisustva.filter(o => o.)
            }
        }

        var ukupanBrSedmica=Math.max.apply(Math, data.prisustva.map(o => o.sedmica))

        for(var i=0;i<data.studenti.length;i++){
            //Ukoliko postoji dva ili vise studenata sa istim indexom
            var pommm=data.studenti.filter(o => o.index==data.studenti[i].index)
            if(pommm.length>1){
                divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                    return false
            }
            //dva ili vise unosa prisustva za istu sedmicu
            for(var j=0;j<ukupanBrSedmica;j++){
                
                var pomm=data.prisustva.filter(o => o.sedmica==j+1 && o.index==data.studenti[i].index)
                if(pomm.length>1){
                    divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                    return false
                }
                var pipi=data.prisustva.filter((o => o.vjezbe==0 && o.predavanja==0 && o.sedmica==j+1))
                if(pipi.length==data.studenti.length){
                    //svi studenti imaju prisustvo nula za trenutnu sedmicu
                    divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                    return false
                }
            }
        }
        return true
    }
    let sljedecaSedmica = function () {
    }
    let prethodnaSedmica = function () {
    }
    let testIscrtaj=function(){
        let ee = document.createElement("h1") 
        ee.textContent="TESTT2"
        divDOMelement.appendChild(ee)
    }

    return{
        iscrtajTabelu: iscrtajTabelu,
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica,
        testIscrtaj: testIscrtaj
    }

};
