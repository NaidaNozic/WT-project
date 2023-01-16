const db = require('./baza.js');
const student = require("./models/student")

const express = require('express')
const bcrypt = require('bcrypt')
const session = require("express-session")
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const path = require('path')
app.use(bodyParser.json())

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/public/views"))

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
    }))

/*BAZA KOMANDE*/
db.sequelize.authenticate().then(()=>{
    console.log("Successful connection!")
}).catch((err)=>{
    console.log("Error connecting to the database!")
})
/*
db.sequelize.sync({alter:true}).then((data)=>{
    console.log("Sync successful!")
}).catch((err)=>{
    console.log("Sync error!")
})*/

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

    db.predmet.findOne({where:{naziv: req.params.naziv}}).then(function(course){
        if(course){
            db.prisustvo.findAll({where:{PredmetId: course.id}}).then(function(prisustvo1){
                var prisustva=prisustvo1.map(o=>o.toJSON())
                
                db.Student_Predmet.findAll({where:{PredmetId:course.id}}).then(async function(studenti){
                    if(studenti){
                        var listaStudenata=[]
                        for(let i=0;i<studenti.length;i++){
                           const s = await db.student.findOne({where:{id:studenti[i].StudentId}})
                           if(s){
                            listaStudenata.push(s)
                           }
                        }
                        var s1=listaStudenata.map(o=>o.toJSON())
                        var objekat={
                            "studenti":s1,
                            "prisustva":prisustva,
                            "predmet":req.params.naziv,
                            "brojPredavanjaSedmicno":course.brojPredavanjaSedmicno,
                            "brojVjezbiSedmicno":course.brojVjezbiSedmicno
                        }
                        res.json(JSON.stringify(objekat))
                    }else{
                        res.json({poruka: 'Neuspješni pronalazak prisustva' })
                    }
                }).catch((err)=>{res.json({poruka: 'Neuspješni pronalazak prisustva' })})
            }).catch((err)=>{res.json({poruka: 'Neuspješni pronalazak prisustva' })})
        }else{
            res.json({poruka: 'Neuspješni pronalazak prisustva' })
        }
    })
})

app.post('/prisustvo/predmet/:naziv/student/:index' ,(req,res) => {
    //inside the body we have {sedmica:N,predavanja:P,vjezbe:V}
    var jsonObj=JSON.parse(JSON.stringify(req.body))


    db.predmet.findOne({where: {naziv: req.params.naziv}}).then(function(foundPredmet){

                db.prisustvo.update({predavanja: jsonObj.predavanja, vjezbe: jsonObj.vjezbe},
                                    {where: {sedmica: jsonObj.sedmica,
                                             index: req.params.index, 
                                             PredmetId: foundPredmet.id}}).then(async function(success){
                    if(success[0]==0){
                        db.prisustvo.create(
                            {
                                sedmica: jsonObj.sedmica,
                                predavanja: jsonObj.predavanja,
                                vjezbe: jsonObj.vjezbe,
                                index: req.params.index,
                                PredmetId: foundPredmet.id
                            }
                        )
                    }
                    db.Student_Predmet.findAll({where:{PredmetId:foundPredmet.id}}).then(async function(studenti){
                        if(studenti){
                            var listaStudenata=[]
                            for(let i=0;i<studenti.length;i++){
                               const s = await db.student.findOne({where:{id:studenti[i].StudentId}})
                               if(s){
                                listaStudenata.push(s)
                               }
                            }

                            var s1=listaStudenata.map(o=>o.toJSON())
                            var newPrisustva = await db.prisustvo.findAll({where: {PredmetId: foundPredmet.id}})
                            var pp=newPrisustva.map(o=>o.toJSON())
                            var objekat={
                                "studenti": s1,
                                "prisustva": pp,
                                "predmet": req.params.naziv,
                                "brojPredavanjaSedmicno": foundPredmet.brojPredavanjaSedmicno,
                                "brojVjezbiSedmicno": foundPredmet.brojVjezbiSedmicno
                            }
                            res.json(JSON.stringify(objekat))
                        }
                    }).catch((err)=>{
                        console.log("Error pri unosu prisustva!")
                        res.json({poruka: 'Neuspješni unos prisustva' })
                    })

                }).catch((err)=>{
                    console.log("Error pri unosu prisustva!")
                    res.json({poruka: 'Neuspješni unos prisustva' })
                })

    }).catch((err)=>{
        console.log("Neuspjesno unosenje prisustva")
        res.json({poruka: 'Neuspješni unos prisustva' })
    })
})

app.post('/login', (req, res) => { 
    var jsonObj=JSON.parse(JSON.stringify(req.body))
    db.nastavnik.findAll({where: {username : jsonObj.username}}).then(async function(nastavnici){
        if(nastavnici.length>0){
            let found=false
            for(let i=0;i<nastavnici.length;i++){
                
                var isPasswordMatched = bcrypt.compareSync(
                    jsonObj.password,
                    nastavnici[i].password_hash
                  )
                if(isPasswordMatched){
                    await db.predmet.findAll({where: {NastavnikId: nastavnici[i].id}}).then(function(courses){
                        if(courses){
                            found=true
                            req.session.predmeti=courses.map(o=>o.naziv)
                        }
                    })
                }

            }
            if(found){
                res.json({poruka: 'Uspješna prijava' })
                return
            }else{
                res.json({poruka: 'Neuspješna prijava' })
                return
            }
        }else{
            res.json({poruka: 'Neuspješna prijava' })
            return
        }
    }).catch((err)=>{console.log("Nesto se desilo kod login-a")})
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

let exportt=app.listen(3000, ()=> {
    console.log("Server is running at port 3000...")
});

module.exports = exportt
