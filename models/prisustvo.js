const Sequelize = require("sequelize")
const sequelize = require("../baza.js");

module.exports = function (sequelize,DataTypes){
        const Prisustvo = sequelize.define("Prisustvo", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            sedmica: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            predavanja: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            vjezbe: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            index: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps:false
        })
    return Prisustvo
}