const router = require('express').Router();
let Enrollment = require('../models/enrollment.model');
router.route('/').get((req,res) => {
  Enrollment.find()
  .then(function(data){
    console.log("sucessful get request for every enrollment data");
    console.log(data);
    res.send({data})
  })
  .catch(err => res.status(400).json("Error from router: " + err));
})
router.route('/add').post((req,res) =>{
    console.log('in the enrollment route')
    const name = req.body.name;
    const course_id = req.body.course_id;
    const crn = req.body.crn;
    const ge_list = req.body.ge_list;
    const units = req.body.units;
    const seats = req.body.seats;
    const max_seats = req.body.max_seats;
    const description = req.body.description;
    const quarter = req.body.quarter;

    const newEnrollment = new Enrollment({
        name, course_id, crn, ge_list, units, seats, max_seats, description, quarter,
    });
    console.log(newEnrollment);
    newEnrollment.save()
    .then(() => res.json("new Enrollment info added"))
    .catch(() => res.status(400).json('Error: ' + err));

})

//609878b3ba0a4ccb47411878
//search for courses by if
router.route("/:id").get((req,res) => {
    Enrollment.findById(req.params.id)
        .then(function(data){
          console.log(data);
          res.send({data})
        })
        .catch(err => res.status(400).json("Error: " + err));
        console.log(req.params)
});


router.route('/:id').delete((req, res) => { // deleting courses by id
    Enrollment.findByIdAndDelete(req.params.name)
      .then(() => res.json('Course deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;