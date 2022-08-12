const {db} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');


const Board = db.define('board', {
    type: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    },

    rating: {
        type: DataTypes.REAL
    }
})


async function main(){
    await Board.sync({force: true})
}

main()

module.exports = {Board};