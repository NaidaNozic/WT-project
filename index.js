const express = require('express')
const bcrypt = require('bcrypt')
const session = require("express-session")
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const path = require('path')
app.use(bodyParser.json())

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"))

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
    }))

//_dirname allows us to get the root directory of our project
//u slucaju da ne moze naci neki file, onda ubacuje "/css, /html, /scripts" u put putanje

//_dirname allows us to get the root directory of our project

//to test, run http://localhost:3000/prisustvo.html
//u terminalu kucati node Zadatak2\Z2.js

app.get('/prisustvo.html', (req, res) => {
    res.sendFile(path.join(__dirname,'public','html','prisustvo.html'));
});

app.get('/predmet.html', (req, res) => {
    res.sendFile(path.join(__dirname,'public','html','predmet.html'));
});

app.get('/predmeti.html', (req, res) => {
   res.render("predmeti",{predmetiLista:req.session.predmeti});
});

app.get('/prijava.html',(req, res) => {
    res.sendFile(path.join(__dirname,'public','html','prijava.html'));
})

app.get('/predmet/:naziv', (req, res) => {

    fs.readFile(path.join(__dirname,'data','prisustva.json'), (err, data) => {
        if (err) throw err

        var prisustva = JSON.parse(data)
        var currentPrisustvo=prisustva.find(element => element.predmet==req.params.naziv)

        if(currentPrisustvo!=null){
            res.json(JSON.stringify(currentPrisustvo))
        }else{
            res.json({poruka: 'Neuspješni pronalazak prisustva' })
        }
    })
})

app.post('/prisustvo/predmet/:naziv/student/:index' ,(req,res) => {
    //inside the body we have {sedmica:N,predavanja:P,vjezbe:V}
    var jsonObj=JSON.parse(JSON.stringify(req.body))

    fs.readFile(path.join(__dirname,'data','prisustva.json'), (error, data) => {
        if (error) {
        console.log("ERROR")
        return;
        }
    
    const jsonData = JSON.parse(data)
    var index = jsonData.findIndex(function(item, i){
        return item.predmet === req.params.naziv
    })

    var index1 = jsonData[index].prisustva.findIndex(function(item,i){
        return item.sedmica==jsonObj.sedmica && item.index==req.params.index
    })

    if(index1==-1){
        var newWeek={
            "sedmica": jsonObj.sedmica,
            "predavanja": jsonObj.predavanja,
            "vjezbe": jsonObj.vjezbe,
            "index": req.params.index
        }
        jsonData[index].prisustva.push(newWeek)
    }else{

        jsonData[index].prisustva[index1].predavanja = jsonObj.predavanja
        jsonData[index].prisustva[index1].vjezbe = jsonObj.vjezbe
    }
    fs.writeFile(path.join(__dirname,'data','prisustva.json'), JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.log("Neuspjesno unosenje prisustva")
            return
        }
        res.json(JSON.stringify(jsonData[index]))
    })
    })
})

app.post('/login', (req, res) => { 
    var jsonObj=JSON.parse(JSON.stringify(req.body))
    //provjera da li postoji taj korisnik
    fs.readFile(path.join(__dirname,'data','nastavnici.json'), async (err, data) => {
        if (err) throw err
        var nastavnici = JSON.parse(data)
        let found=false

            nastavnici.some( function(element) {
               
                if(element.nastavnik.username == jsonObj.username){

                    var isPasswordMatched = bcrypt.compareSync(
                        jsonObj.password,
                        element.nastavnik.password_hash
                      )

                    if(isPasswordMatched){
                        req.session.username=element.nastavnik.username
                        req.session.predmeti=element.predmeti
                        found=true
                        return true
                    }
                }
            })
            if(found){  
                res.json({poruka: 'Uspješna prijava' })
            }else {
                res.json({poruka: 'Neuspješna prijava' })
            }    
    })
})  

app.post('/logout', (req,res) => {
    //brise podatke iz sesije
    if(req.session.username!=null){
        req.session.username=null
        req.session.predmeti=null
        res.end(JSON.stringify({poruka: 'Uspješan logout'}))
    }else{
        res.end(JSON.stringify({poruka: 'Neuspješan logout'}))
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname)))
app.use('/html', express.static(path.join(__dirname)))
app.use('/scripts', express.static(path.join(__dirname)))
app.use('/img', express.static(path.join(__dirname)))

app.listen(3000, ()=> {
    console.log("Server is running at port 3000...")
});
