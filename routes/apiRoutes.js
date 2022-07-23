const router = require("express").Router();
const db = require('../db/db.json');
const uniqid = require('uniquid');

const fs = require('fs');
const path = require('path');

router.get('/notes/:id', (req, res) => {
    db = JSON.parse(fs.readFileSync('../db/db.json', "utf-8"))

     res.json(db);

});

router.post('api/notes', (req, res) => {
   let dbTemplate = {

    title: req.body.title,
    text: req.body.text,
    id: uniqid()

   }

   db.push(dbTemplate);
   
   fs.writeFileSync('../db/db.json', JSON.stringify(db));
   
   res.json(db);
})


module.export = router;