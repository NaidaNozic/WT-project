const Sequelize = require("sequelize")
const sequelize = require("../baza.js");

module.exports = function (sequelize,DataTypes){
        const Predmet = sequelize.define("Predmet", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            naziv: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brojPredavanjaSedmicno: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            brojVjezbiSedmicno: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps:false
        })
    return Predmet
}