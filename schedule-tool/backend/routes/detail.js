const router = require('express').Router();
let Detail = require('../models/detail.model');

router.route('/').get((req, res) => {
  Detail.find()
    .then(detail => res.json(detail))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log("in the route")
  const name = req.body.name;
  const course_id = req.body.course_id;
  const instructor = req.body.instructor;
  const aplus = Number(req.body.aplus);
  const a = Number(req.body.a);
  const aminus = Number(req.body.aminus);
  const bplus = Number(req.body.bplus);
  const b = Number(req.body.b);
  const bminus = Number(req.body.bminus);
  const cplus = Number(req.body.cplus);
  const c = Number(req.body.c);
  const cminus = Number(req.body.cminus);
  const dplus = Number(req.body.dplus);
  const d = Number(req.body.d);
  const dminus = Number(req.body.dminus);
  const f = Number(req.body.f);
  const quarter = req.body.quarter;

  const newDetail = new Detail({
    name,
    course_id,
    instructor,
    aplus,
    a,
    aminus,
    bplus,
    b,
    bminus,
    cplus,
    c,
    cminus,
    dplus,
    d,
    dminus,
    f,
    quarter,
  });

  console.log(newDetail);

  newDetail.save()
  .then(() => res.json('Detail added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Detail.findById(req.params.id)
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Detail.findByIdAndDelete(req.params.id)
    .then(() => res.json('Course deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Detail.findById(req.params.id)
    .then(detail => {
      detail.name = req.body.name;
      detail.course_id = req.body.course_id;
      detail.instructor = req.body.instructor;
      detail.aplus = Number(req.body.aplus);
      detail.a = Number(req.body.a);
      detail.aminus = Number(req.body.aminus);
      detail.bplus = Number(req.body.bplus);
      detail.b = Number(req.body.b);
      detail.bminus = Number(req.body.bminus);
      detail.cplus = Number(req.body.cplus);
      detail.c = Number(req.body.c);
      detail.cminus = Number(req.body.cminus);
      detail.dplus = Number(req.body.dplus);
      detail.d = Number(req.body.d);
      detail.dminus = Number(req.body.dminus);
      detail.f = Number(req.body.f);
      detail.quarter = req.body.quarter;

      detail.save()
        .then(() => res.json('Detail updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;