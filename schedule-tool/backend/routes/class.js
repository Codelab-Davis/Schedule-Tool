const router = require('express').Router();
let Class = require('../models/class.model');

router.route('/').get((req, res) => {
  Class.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const class_id = req.body.class_id; //come back to --> class_id (?)

  const newClass = new Class({class_id});

  newClass.save()
    .then(() => res.json('Class added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;