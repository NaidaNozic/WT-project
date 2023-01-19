const db = require('./baza.js')

db.sequelize.sync({force:true}).then(async (data)=>{
    console.log("Sync successful!")
    await addTestData()
    process.exit()
}).catch((err)=>{
    console.log("Sync error!")
})

const addTestData = async function(){
    await db.student.bulkCreate([
        {
            id: 1, ime: "Neko Nekic", index: 12345
        },
        { 
            id: 2, ime: "Drugi Neko", index: 12346
        },
        { 
            id: 3, ime: "Treci Neko", index: 12347
        }
        ])

    await db.nastavnik.bulkCreate([
            {
                id: 1, username: "Naida", password_hash: "$2a$10$h8x1ClkmKuz6dHF1xKpbKOU2kLkIgT2WGtGjEs20b5EIaiJc7jqti"
            },
            { 
                id: 2, username: "Adem", password_hash: "$2a$10$PkGKas/8ENNj9YTnOfJdIeWodl81ZxLT6LyYhiVSl5XhK1YxphI5e"
            }
            ])

    await db.predmet.bulkCreate([
        {
            id:1,
            naziv: "Razvoj mobilnih aplikacija",
            brojPredavanjaSedmicno: 2,
            brojVjezbiSedmicno: 2,
            NastavnikId: 1
        },
        { 
            id:2,
            naziv: "Osnove informacionih istrazivanja",
            brojPredavanjaSedmicno: 2,
            brojVjezbiSedmicno: 2,
            NastavnikId: 1
        },
        { 
            id:3,
            naziv: "Web tehnologije",
            brojPredavanjaSedmicno: 2,
            brojVjezbiSedmicno: 2,
            NastavnikId:2
        }
        ])

    await db.prisustvo.bulkCreate([
        {
            id: 1,
            sedmica: 1,
            predavanja: 1,
            vjezbe: 1,
            index: 12345,
            PredmetId: 1
        },
        {
            id: 2,
            sedmica: 1,
            predavanja: 2,
            vjezbe: 1,
            index: 12346,
            PredmetId: 1
        },
        {
            id: 3,
            sedmica: 1,
            predavanja: 1,
            vjezbe: 2,
            index: 12347,
            PredmetId: 1
        },
        {
            id: 4,
            sedmica: 2,
            predavanja: 0,
            vjezbe: 0,
            index: 12345,
            PredmetId: 1
        },
        {
            id: 5,
            sedmica: 2,
            predavanja: 2,
            vjezbe: 1,
            index: 12347,
            PredmetId: 1
        },
        {
            id: 6,
            sedmica: 2,
            predavanja: 2,
            vjezbe: 1,
            index: 12346,
            PredmetId: 1
        },
        {
            id: 7,
            sedmica: 3,
            predavanja: 1,
            vjezbe: 0,
            index: 12345,
            PredmetId: 1
        },
        {
            id: 8,
            sedmica: 3,
            predavanja: 0,
            vjezbe: 1,
            index: 12346,
            PredmetId: 1
        },
        {
            id: 9,
            sedmica: 3,
            predavanja: 2,
            vjezbe: 1,
            index: 12347,
            PredmetId: 1
        },
        {
            id: 10,
            sedmica: 4,
            predavanja: 2,
            vjezbe: 1,
            index: 12345,
            PredmetId: 1
        },
        {
            id: 11,
            sedmica: 4,
            predavanja: 2,
            vjezbe: 0,
            index: 12347,
            PredmetId: 1
        },
        //drugi predmet
        {
            id: 12,
            sedmica: 1,
            predavanja: 0,
            vjezbe: 2,
            index: 12345,
            PredmetId: 2
          },
          {
            id: 13,
            sedmica: 2,
            predavanja: 1,
            vjezbe: 0,
            index: 12346,
            PredmetId: 2
          },
          //treci predmet
          {
            id: 14,
            sedmica: 1,
            predavanja: 0,
            vjezbe: 2,
            index: 12345,
            PredmetId: 3
          },
          {
            id: 15,
            sedmica: 1,
            predavanja: 2,
            vjezbe: 1,
            index: 12346,
            PredmetId: 3
          },
          {
            id: 16,
            sedmica: 2,
            predavanja: 1,
            jezbe: 0,
            index: 12345,
            PredmetId: 3
          },
          {
            id: 17,
            sedmica: 2,
            predavanja: 0,
            vjezbe: 1,
            index: 12346,
            PredmetId: 3
          },
          { 
            id: 18,
            sedmica: 3,
            predavanja: 1,
            vjezbe: 0,
            index: 12345,
            PredmetId: 3
          },
          {
            id: 19,
            sedmica: 3,
            predavanja: 0,
            vjezbe: 1,
            index: 12346,
            PredmetId: 3
          }
        ])
    

    await db.Student_Predmet.bulkCreate([
        {
            StudentId:1,
            PredmetId:1
        },
        {
            StudentId:1,
            PredmetId:2
        },
        {
            StudentId:1,
            PredmetId:3
        },
        {
            StudentId:2,
            PredmetId:1
        },
        {
            StudentId:2,
            PredmetId:2
        },
        {
            StudentId:2,
            PredmetId:3
        },
        {
            StudentId:3,
            PredmetId:1
        }
    ])
}

