

/*export */let TabelaPrisustvo = function(divDOMelement,data1){ 

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
        tabelaEl.id="MainTable"
        divDOMelement.appendChild(tabelaEl) 
        tabela=tabelaEl

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

                if(pom1==null){
                    if(j!=ukupanBrSedmica-1)dodajCeliju(red,"").rowSpan="2"
                    else{
                        for(var k=0;k<data1.brojPredavanjaSedmicno;k++){
                            dodajCeliju(red,"P "+(k+1)).style.height="30px"
                        }
                       
                        for(var k=0;k<data1.brojVjezbiSedmicno;k++){
                            dodajCeliju(red,"V "+(k+1)).style.height="30px"
                        }
                        var c=dodajCeliju(red1,"")
                        c.colSpan=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno
                        c.style.height="30px"
                    }
                }else{

                if(j!=ukupanBrSedmica-1){
                dodajCeliju(red,(pom1.predavanja+pom1.vjezbe)/(
                                 data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno
                                 )*100+"%").rowSpan="2"
                }
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
        dodajDugmadi()
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
        }

        var ukupanBrSedmica=Math.max.apply(Math, data.prisustva.map(o => o.sedmica))

        for(var i=0;i<data.studenti.length;i++){
            //Ukoliko postoji dva ili vise studenata sa istim indexom
            var pommm=data.studenti.filter(o => o.index==data.studenti[i].index)
            if(pommm.length>1){
                divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                    return false
            }
    
            for(var j=0;j<ukupanBrSedmica;j++){

                //Za trenutnu sedmicu nema nikako unesenog prisustva za nijednost studenta
                var pipi=data.prisustva.filter((o =>o.sedmica==j+1))
                if((pipi==null || (pipi!=null && pipi.length==0)) && j+1!=1 && j+1!=ukupanBrSedmica){
                    var pipi1=data.prisustva.filter((o =>o.sedmica==j))
                    var pipi2=data.prisustva.filter((o =>o.sedmica==j+2))
                    if(pipi1!=null &&pipi1.length>0 && pipi2!=null && pipi2.length>0){
                        divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                        return false
                    }
                }
                //dva ili vise unosa prisustva za istu sedmicu
                var pomm=data.prisustva.filter(o => o.sedmica==j+1 && o.index==data.studenti[i].index)
                if(pomm.length>1){
                    divDOMelement.textContent="Podaci o prisustvu nisu validni!"
                    return false
                }
            }
        }
        return true
    }

    let trenutnaSedmica=Math.max.apply(Math,data1.prisustva.map(o => o.sedmica));
    let tabela;

    let sljedecaSedmica = function () {
        var k=trenutnaSedmica
        if(k==Math.max.apply(Math,data1.prisustva.map(o => o.sedmica)))return 
        var table = tabela;
        /*Brisem sve celije kolone trenutne sedmice*/
        for (var i = 1, row; i<=table.rows.length, row = table.rows[i]; i++){
            var l=1
            if(row.cells.length!=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno){
                if(row.cells.length==1){
                    row.deleteCell(0)
                }
                else{
                while(l<=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno){
                    row.deleteCell(1+k)
                    l++
                }
            }
            }else{
                while(l<=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno){
                    row.deleteCell(0)
                    l++
                }
            }
        }
        table.rows[0].cells[1+k].colSpan="1"
        /*Dodajem nove celije samo sa postotcima*/
        var p=0
        for(var i=1, rows; i<=table.rows.length, row=table.rows[i]; i+=2){
            var newCell=row.insertCell(1+k)
            newCell.rowSpan="2"
            var pom1=data1.prisustva.find(o => o.index==data1.studenti[p].index && o.sedmica==trenutnaSedmica)
            if(pom1==null || (pom1!=null && pom1.length==0)){
                var newText=document.createTextNode("")
                newCell.appendChild(newText)
            }
            else{
            var newText = document.createTextNode((pom1.predavanja+pom1.vjezbe)/(
                                                  data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno)*100+"%")
            newCell.appendChild(newText);
            }
            p++
        }
        trenutnaSedmica++
        prikaziDetaljeSedmice()
    }

    let prethodnaSedmica = function () {
        var k=trenutnaSedmica
        if(k==1)return
        var table = tabela;
        /*Brisem sve celije kolone trenutne sedmice*/
        for (var i = 1, row; i<=table.rows.length, row = table.rows[i]; i++){
            var l=1
            if(row.cells.length!=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno){
                if(row.cells.length==1){
                    row.deleteCell(0)
                }
                else
                {
                while(l<=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno){
                    row.deleteCell(1+k)
                    l++
                }
            }
            }else{
                while(l<=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno){
                    row.deleteCell(0)
                    l++
                }
            }
        }
        table.rows[0].cells[1+k].colSpan="1"
        /*Dodajem nove celije samo sa postotcima*/
        var p=0
        for(var i=1, rows; i<=table.rows.length, row=table.rows[i]; i+=2){
            var newCell=row.insertCell(1+k)
            newCell.rowSpan="2"
            var pom1=data1.prisustva.find(o => o.index==data1.studenti[p].index && o.sedmica==trenutnaSedmica)
            if(pom1==null || (pom1!=null && pom1.length==0)){
                var newText=document.createTextNode("")
                newCell.appendChild(newText)
            }else{
            var newText = document.createTextNode((pom1.predavanja+pom1.vjezbe)/(
                                                  data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno)*100+"%")
            newCell.appendChild(newText);
            }
            p++
        }
        trenutnaSedmica--
        prikaziDetaljeSedmice()
    }

    let prikaziDetaljeSedmice=function(){
        tabela.rows[0].cells[1+trenutnaSedmica].colSpan=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno
        var brojStudenata=0
        var pom1

        for(var j=1;j<tabela.rows.length;j++){

           if((j)%2!=0) {
            tabela.rows[j].deleteCell(1+trenutnaSedmica)
            brojStudenata++
           }

           for(var k=0;k<data1.brojPredavanjaSedmicno;k++){
            if((j)%2!=0){
                var celija=tabela.rows[j].insertCell(1+trenutnaSedmica+k)
                    celija.textContent="P "+(k+1)
                    celija.style.height="30px"
            }else{

                var pom2=data1.prisustva.filter(o => o.index==data1.studenti[brojStudenata-1].index)
                pom1=pom2.find(o => o.sedmica==trenutnaSedmica)

                if(pom1==null || (pom1!=null && pom1.length==0)){
                    var c1=tabela.rows[j].insertCell(k)
                    c1.colSpan=data1.brojPredavanjaSedmicno+data1.brojVjezbiSedmicno
                    c1.style.height="30px"
                    break
                }
                else{
                    if(pom1.predavanja>=k+1){
                      tabela.rows[j].insertCell(k).style.backgroundColor="lightgreen"
                    }else tabela.rows[j].insertCell(k).style.backgroundColor="#eb5050"
                }
            }
           }

           for(var k=0;k<data1.brojVjezbiSedmicno;k++){
            if((j)%2!=0){
                var celija=tabela.rows[j].insertCell(1+trenutnaSedmica+data1.brojPredavanjaSedmicno+k)
                    celija.textContent="V "+(k+1)
                    celija.style.height="30px"
            }else{
                if(pom1==null || (pom1!=null && pom1.length==0)){
                    break
                }else{

                if(pom1.vjezbe>=k+1){
                    var celija=tabela.rows[j].insertCell(k+data1.brojPredavanjaSedmicno)
                    celija.style.backgroundColor="lightgreen"  
                    celija.style.height="30px"
                } 
                else{
                    var celija=tabela.rows[j].insertCell(k+data1.brojPredavanjaSedmicno)
                    celija.style.backgroundColor="#eb5050"
                    celija.style.height="30px"
                }

                }
            }
           }
        }

    }
    let dodajDugmadi=function(){
        var dugmeDesno=document.createElement("button")
        dugmeDesno.type="button"
        dugmeDesno.ariaLabel="Btn1"
        dugmeDesno.innerHTML='<i class="fa-solid fa-arrow-right"></i>'
        dugmeDesno.addEventListener("click",sljedecaSedmica);
        dugmeDesno.style="height:40px; width:50px;font-size:20px;margin:5px"
        divDOMelement.appendChild(dugmeDesno)

        var dugmeLijevo=document.createElement("button")
        dugmeLijevo.type="button"
        dugmeLijevo.ariaLabel="Btn2"
        dugmeLijevo.innerHTML='<i class="fa-solid fa-arrow-left"></i>'
        dugmeLijevo.addEventListener("click",prethodnaSedmica);
        dugmeLijevo.style="height:40px; width:50px;font-size:20px;margin:5px"
        divDOMelement.appendChild(dugmeLijevo)
    }

    return{
        iscrtajTabelu: iscrtajTabelu,
        trenutnaSedmica: trenutnaSedmica,
        tabela: tabela,
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica,
        dodajDugmadi: dodajDugmadi,
        prikaziDetaljeSedmice: prikaziDetaljeSedmice
    }

};
