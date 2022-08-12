const {db} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');


const User = db.define('user', {
    name: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    }

})



async function main(){
    await User.sync({force: true})
}

main()

module.exports = {User};