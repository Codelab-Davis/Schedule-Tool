const router = require('express').Router();
let Detail = require('../models/detail.model');

router.route('/').get((req, res) => {
  Detail.find()
    .then(detail => res.json(detail))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const class_id = req.body.class_id;
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
    class_id,
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

  newDetail.save()
  .then(() => res.json('Detail added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:class_id').get((req, res) => {
  Exercise.findById(req.params.class_id)
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:class_id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.class_id)
    .then(() => res.json('Class deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:class_id').post((req, res) => {
  Exercise.findById(req.params.class_id)
    .then(exercise => {
      const name = req.body.name;
      const class_id = req.body.class_id;
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

      detail.save()
        .then(() => res.json('Detail updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;