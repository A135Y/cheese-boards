const {db} = require('./db')
const {Board, User, Cheese} = require('./models')


describe('Board, Menu, User Models work correctly', () => {

    beforeAll(async () => {
        await db.sync({force:true})
    })

    test('can create User', async () => {
        const testUser = await User.create({
            name: 'Robot',
            email: 'robot123@robot.com'
        })
        expect(testUser.name).toEqual('Robot')
        expect(testUser.email).toEqual('robot123@robot.com')
    })

    test('can create Board', async () => {
        const testBoard = await Board.create({
            type: 'Hard Cheese',
            description: 'Sunday Cheese Board',
            rating: 8.5
        })
        expect(testBoard.type).toEqual('Hard Cheese')
        expect(testBoard.description).toEqual('Sunday Cheese Board')
        expect(testBoard.rating).toEqual(8.5)
    })

    test('can create Cheese', async() => {
        const testCheese = await Cheese.create({
            title: 'Parmesan',
            description: 'Best Cheese',
        })
        expect(testCheese.title).toEqual('Parmesan')
        expect(testCheese.description).toEqual('Best Cheese')
    })
})


describe('User can have many boards', () => {

    beforeAll(async () => {
        await db.sync({force:true})
    })

    test('user can have many boards', async() => {

        const User1 = await User.create({
            name: 'Abdalla',
            email: 'email@email.com'
        })

        const hardCheeseBoard = await Board.create({
            type: 'Hard Cheese',
            description: 'First Board',
            rating: 9
        })

        const softCheeseBoard = await Board.create({
            type: 'Soft Cheese',
            description: 'Second Board',
            rating: 5.8
        })

        const mixCheeseBoard = await Board.create({
            type: 'Mixed Cheeses',
            describe: 'Best of both worlds',
            rating: 10
        })

        await User1.addBoard(hardCheeseBoard)
        await User1.addBoard(softCheeseBoard)
        await User1.addBoard(mixCheeseBoard)
        const getBoards = await User1.getBoards()
        console.log(getBoards)
        console.log(User1)
        
        expect(getBoards[0].type).toEqual(hardCheeseBoard.type)
        expect(getBoards[0].rating).toEqual(9)
        expect(getBoards[1].type).toEqual(softCheeseBoard.type)
        expect(getBoards[1].rating).toEqual(5.8)
        expect(getBoards[2].type).toEqual(mixCheeseBoard.type)
        expect(getBoards[2].rating).toEqual(mixCheeseBoard.rating)
    })
})

describe('A Board can have many cheeses and a cheese can be on many boards', () =>{

    beforeAll(async () => {
        await db.sync({force:true})
    })

    test('Board can have many cheeses', async () => {

        const hardCheeseBoard = await Board.create({
            type: 'Hard Cheese',
            description: 'First Board',
            rating: 9
        })

        const softCheeseBoard = await Board.create({
            type: 'Soft Cheese',
            description: 'Second Board',
            rating: 5.8
        })

        const mixCheeseBoard = await Board.create({
            type: 'Mixed Cheeses',
            describe: 'Best of both worlds',
            rating: 10
        })

        const parmesan = await Cheese.create({
            title: 'Parmesan',
            description: 'Italian Cheese',
        })

        const gruyère = await Cheese.create({
            title: 'Gruyère',
            description: 'Swiss Cheese',
        })

        const pecorino = await Cheese.create({
            title: 'Pecorino',
            description: 'Sheeps Cheese'
        })

        const mozzarella = await Cheese.create({
            title: 'Mozzarella',
            description: 'Pizza Cheese'
        })

        const brie = await Cheese.create({
            title: 'Brie',
            description: 'French Cheese'
        })

        const creamCheese = await Cheese.create({
            title: 'Cream Cheese',
            description: ' Frosting Cheese'
        })

        await hardCheeseBoard.addCheese(parmesan)
        await hardCheeseBoard.addCheese(gruyère)
        await hardCheeseBoard.addCheese(pecorino)
        await softCheeseBoard.addCheese(mozzarella)
        await softCheeseBoard.addCheese(brie)
        await softCheeseBoard.addCheese(creamCheese)
        await mixCheeseBoard.addCheese(mozzarella)
        await mixCheeseBoard.addCheese(brie)
        await mixCheeseBoard.addCheese(parmesan)


        const getHardCheeses = await hardCheeseBoard.getCheeses()
        const getSoftCheeses = await softCheeseBoard.getCheeses()
        const getMixCheeses = await mixCheeseBoard.getCheeses()
        // console.log(getHardCheeses)
        // console.log(getSoftCheeses[2].description)
        expect(getHardCheeses[0].title).toEqual(parmesan.title)
        expect(getHardCheeses[1].title).toEqual(gruyère.title)
        expect (getSoftCheeses[0].title).toEqual(mozzarella.title)
        expect (getSoftCheeses[0].title).toEqual(mozzarella.title)
        expect(getSoftCheeses[2].description).toEqual(creamCheese.description)
        expect(getMixCheeses[0].title).toEqual(mozzarella.title)
        expect(getMixCheeses[1].description).toEqual

    })

})
