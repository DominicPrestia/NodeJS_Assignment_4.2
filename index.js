const express = require('express'); //uses the express module/package
const app = express(); // creates an express application
const port = 3000;



let fruits = [
    {
        id: "1",
        name: "bannana"
    },
    {
        id: "2",
        name: "mango"
    },
    {
        id: "3",
        name: "apple"
    }
]

app.get('/', (request, response) => {
    response.status(200).json({ message: "Welcome to Express App", data: fruits })
})

app.get('/fruits', (request, response) => {
    response.status(200).json({ data: fruits });
})

app.get('/fruits/:id', (request, response) => {

    let fruitID = request.params.id
    let fruit = fruits.filter((fruit) => fruit.id == fruitID)

    if (fruit.length > 0) {
        response.status(200).send("Fruit: " + fruit[0].name)
    } else {
        response.status(200).send(`No Fruit ID of ${fruitID} exists`)
    }
})

// This method uses the filter method to delete 1 fruit from the array

// app.delete('/fruits/:id', (request, response) => {
//     let fruitToDelete = request.params.id
//     let newFruitsList = fruits.filter((fruit,index) => {
//             console.log("index: ", index, "FruitID: ", fruit.id)
//         return fruit.id != fruitToDelete})

//     if(newFruitsList.length < fruits.length){
//         fruits = newFruitsList
//         response.status(200).send(fruits)
//     } else{
//         response.status(200).send(`No Fruit ID of ${fruitToDelete} exists`)
//     }    
// })

//this method uses the splice() to remove 1 element from the array. 
app.delete('/fruits/:id', (request, response) => {
    let fruitToDelete = request.params.id
    let fruitIndex = fruits.findIndex(fruitID => fruitID.id == fruitToDelete)

    if (fruitIndex !== -1) {
        fruits.splice(fruitIndex, 1)
        response.status(200).send({ message: "Remaining Fruits: ", data: fruits })
    } else (
        response.status(200).send(`Selected ID:${fruitToDelete} already does not exist`)
    )
})


app.listen(port, () => { //Listen to the port for a ping - ping port by going to: http://localhost:3000/
    console.log(`App Listeing on port: ${port}`)
})