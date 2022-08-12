const {db} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');


const Cheese = db.define('cheese', {

    title: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    }
})


async function main(){
    await Cheese.sync({force: true})
}

main()

module.exports = {Cheese};