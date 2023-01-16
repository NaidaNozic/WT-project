const Sequelize = require('sequelize')

const sequelize = new Sequelize('wt22', 'root', 'password', {
    host: 'localhost',
   dialect: 'mysql' 
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.student = require('./models/student.js')(sequelize)
db.predmet = require('./models/predmet.js')(sequelize)
db.prisustvo = require('./models/prisustvo.js')(sequelize)
db.nastavnik = require('./models/nastavnik.js')(sequelize)

db.predmet.hasMany(db.prisustvo,{as:'predmetId'})
db.nastavnik.hasMany(db.predmet,{as:'nastavnikId'})

//medjutabela Predmeta i Studenata
const Student_Predmet = sequelize.define('Student_Predmet', {}, { timestamps: false })
db.Student_Predmet=Student_Predmet

db.student.belongsToMany(db.predmet,{ through: Student_Predmet })
db.predmet.belongsToMany(db.student,{ through: Student_Predmet })

module.exports=db