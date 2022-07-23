const router = require("express").Router();
const db = require('../db/db.json');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    db = JSON.parse(fs.readFileSync('../db/db.json', "utf-8"))

     res.json(db);

});

router.post('/notes', (req, res) => {
   let dbTemplate = {

    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random()*1000)

   }

   db.push(dbTemplate);
   fs.writeFileSync('../db/db.json', JSON.stringify(db));
   
   res.json(db);
})


module.export = router;