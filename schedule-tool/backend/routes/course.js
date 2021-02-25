const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
  Course.find()
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const course_id = req.body.course_id; //come back to --> class_id (?)

  const newCourse = new Course({course_id});

  newCourse.save()
    .then(() => res.json('Course added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;