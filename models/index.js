const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')


User.hasMany(Board)
Cheese.belongsToMany(Board, {through: 'Board-cheese'})
Board.hasMany(Cheese)



module.exports = {Board, User, Cheese}
