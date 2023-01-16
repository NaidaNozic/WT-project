const Sequelize = require("sequelize")
const sequelize = require("../baza.js");

module.exports = function (sequelize,DataTypes){
        const Student = sequelize.define("Student", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            ime: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            index: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            }
        },
        {
            timestamps:false
        })
    return Student
}