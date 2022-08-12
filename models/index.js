const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')


User.hasMany(Board)
Board.belongsTo(User)
Cheese.belongsToMany(Board, {through: 'Board-Cheese'})
Board.belongsToMany(Cheese,{through: 'Board-Cheese'})



module.exports = {Board, User, Cheese}
