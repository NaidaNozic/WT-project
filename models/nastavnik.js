const Sequelize = require("sequelize")
const sequelize = require("../baza.js");

module.exports = function (sequelize,DataTypes){
        const Nastavnik = sequelize.define("Nastavnik", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            timestamps:false
        })
    return Nastavnik
}