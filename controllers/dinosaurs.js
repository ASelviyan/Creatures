const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter){
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() === nameFilter.toLowerCase()) 
    }
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

//NEW DINO FORM ROUTE
router.get('/new', (req, res) =>{
    res.render('dinosaurs/new.ejs')
})

//SHOW ROUTE(a specific dinosaurs)
router.get('/:id', (req, res) => {
    //get the array of dinos from the json
      let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //identify the index of the dino in question
    let dinoIndex = req.params.id
    console.log(`The dino you're searching for is ${dinoIndex}`)
    //isolate the dino in question
    // console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

//POST A NEW DINO ROUTE
router.post('/', (req, res)=>{
       let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //add the new dno to the array
    dinoData.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})


//GET /dinosaurs/edit/:id -- a view of a form to edit a spacific dino @ :id
router.get('/edit/:id', (req, res) => {
     let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {
        dinoId: req.params.id,
        dino: dinoData[req.params.id]
        
    })
     res.redirect('/dinosaurs')
})
//PUT /dinosaurs/:id -- update a dino @ :id inthe database
router.put('/:id', (req, res) => {
    //get the dinos from from dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(req.params.id, req.body)

    //update the dino basded on the req.params.id and the req.body
    //req.params = which dino
    //req.body = dino data updated
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    //write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //to see all the dinos
    res.redirect('/dinosaurs')
    //jsut to see the spacific dino
    // res.redirect(`/dinosaurs/${req.params.id}`)
    //we will get the dino data from the request body
})
//DELETE /dinosaurs/:id -- Destroy a dino @ :id
router.delete('/:id', (req, res) => {

    //get the dinos form the dino json
const dinosaurs = fs.readFileSync('./dinosaurs.json')
const dinoData = JSON.parse(dinosaurs)
    //splice dino out of the array(index form the req.params)
    dinoData.splice(req.params.id, 1)

     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

     res.redirect('/dinosaurs')
})
module.exports = router