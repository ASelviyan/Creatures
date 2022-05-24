const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    res.render('prehistoric_creatures/index.ejs', {myCreature: creaturesData})
})

//NEW CREATURES FORM ROUTE
router.get('/new', (req, res) =>{
    res.render('prehistoric_creatures/new.ejs')
})

//SHOW ROUTE(a specific creature)
router.get('/:id', (req, res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
     let index = req.params.id
     res.render("prehistoric_creatures/show.ejs", {myCreature: creaturesData[index]})
})


//POST A NEW CREATURES ROUTE
router.post('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    
    //add the new creature to the array
    //req.body = the data that was submited in the form 
    creaturesData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.render('prehistoric_creatures/new.ejs')
})

//EDIT A CREATURE
router.get('/edit/:id', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)

    let index = req.params.id
    

    res.render('prehistoric_creatures/edit.ejs', {myCreatures: creaturesData[index], index})
     res.redirect('/creatures')
})

router.put('/:id', (req, res) => {
     let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    
    let index = req.params.id
    creaturesData[index].type = req.body.type
    creaturesData[index].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.redirect('/creatures')

})

//DELETE A CREATURE
router.delete('/:id', (req, res) =>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    
    creaturesData.splice(req.params.id, 1)
    console.log(JSON.stringify(creaturesData))

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
     res.redirect('/creatures')
})

module.exports = router 