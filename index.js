const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const path = require('path')
app.use(bodyParser.json()) //OVO ČUDO MI JE FALILO!!!!

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

app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'public','html','prijava.html'));
})

app.post('/login/1', (req, res) => { 
    let jsonObj=req.body
    res.json([{
        username: req.body.username,
        password: req.body.password
    }]) 
    console.log(jsonObj)
    res.status(200)
   // res.send("NESTO")
 })  

app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname)))
app.use('/html', express.static(path.join(__dirname)))
app.use('/scripts', express.static(path.join(__dirname)))
app.use('/img', express.static(path.join(__dirname)))


app.listen(3000, ()=> {
    console.log("Server is running at port 3000...")
});
