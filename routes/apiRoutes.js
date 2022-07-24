const router = require("express").Router();
const db = require('../db/db.json');
const uniqid = require('uniquid');

const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getNotes() {
  return readFile("db/db.json", "utf-8").then(rawNotes => {
      let notesArray = []
      try {
         notesArray = notesArray.concat(JSON.parse(rawNotes))
      } catch (error) {
         notesArray = []
      }
      return notesArray;
   })

}

router.get('/notes', (req, res) => {
   getNotes().then(notesArray => res.json(notesArray))
});

router.post('/notes', (req, res) => {
   let dbTemplate = {

    title: req.body.title,
    text: req.body.text,
    id: uniqid()

   }

   getNotes().then(oldArray => [...oldArray, dbTemplate]).then(updatedArray => {
      fs.writeFileSync('db/db.json', JSON.stringify(updatedArray));

   })

   res.json({
      msg: 'okay'
   })
})

module.exports = router;
