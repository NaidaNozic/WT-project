const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()
const path = require('path')

//app.set("view engine", "pug");
//app.set("views", path.join(__dirname, "views"))
app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
    }))
app.use(bodyParser.json())

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
    res.sendFile(path.join(__dirname,'public','html','predmeti.html'));
});

app.get('/prijava.html',(req,res) => {
    res.sendFile(path.join(__dirname,'public','html','prijava.html'));
})

app.post('/login', (req, res) => { 
    var jsonObj=req.body
    //provjera da li postoji taj korisnik
    fs.readFile(path.join(__dirname,'data','nastavnici.json'), (err, data) => {
        if (err) throw err
        var nastavnici = JSON.parse(data)

        var currentNastavnik=nastavnici.find(element => element.nastavnik.username == jsonObj.username 
                                                        && element.nastavnik.password_hash==jsonObj.password)                              
        if(currentNastavnik!=null){
            //u sesiju upisujem username i listu predmeta na kojima je nastavnik
            req.session.username=currentNastavnik.nastavnik.username
            req.session.predmeti=currentNastavnik.predmeti

            res.end(JSON.stringify({poruka: 'Uspješna prijava', redirect_path: "/predmeti.html"}))
        }else{
            res.end(JSON.stringify({poruka: 'Neuspješna prijava'}))
        }
    })
})  

app.post('/logout', (req,res) => {
    //brise podatke iz sesije
    if(req.session.username!=null){
        console.log("Username prije brisanja: "+req.session.username)
        console.log("Predmeti prije brisanja: "+req.session.predmeti)
        req.session.username=null
        req.session.predmeti=null
    }
    res.end(JSON.stringify({poruka: 'Uspješan logout', redirect_path: "/prijava.html"}))
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname)))
app.use('/html', express.static(path.join(__dirname)))
app.use('/scripts', express.static(path.join(__dirname)))
app.use('/img', express.static(path.join(__dirname)))

app.listen(3000, ()=> {
    console.log("Server is running at port 3000...")
});
