// obtaining course information 

const router = require('express').Router();
let Detail = require('../models/detail.model');

router.route('/').get((req, res) => {
  var filter = {};
  var projections = "null";
  var options = {};
  var aggregateArray = [];

  if("start" in req.query && "limit" in req.query){
    options.skip = parseInt(req.query.start);
    options.limit = parseInt(req.query.limit);
  }

  if(("filter" in req.query) && (req.query.filter.length > 0)) {
    filter.name = {"$regex": req.query.filter, "$options": "i"};
  }

  // Detail.find(filter, projections, options)
  //   .then(detail => res.json(detail))
  //   .catch(err => res.status(400).json('Error: ' + err));
  var filter = {};
  if ('match' in req.query) {
    // create list of items to match
    filterList = [];
    for (var index = 0; index < req.query.match.length; index = index + 2) {
      var matchItem = req.query.match[index];
      var value = req.query.match[index + 1];
      var filterItem = {};
      filterItem[matchItem] = value;
      filterList.push(filterItem);
    }
    // create filter aggregation pipeline
    filter = {$and: filterList};
  }

  if('group' in req.query) {
    var groupIDmap = {};
    var groupAddons = {};
    var project = {"_id" : 0};
    var sort = {};

    req.query.group.forEach(item => {groupIDmap[item] = ("$" + item)});
    req.query.group.forEach(item => {project[item] = ("$_id." + item)});
    req.query.group.forEach(item => {sort[item] = 1});

    if('detail' in req.query) {
      req.query.detail.forEach(item => {
        // groupAddons[item] = ("$$ROOT." + item);
        groupAddons[item] = ("$" + item);
      });

      project["courses"] = "$courses";
    } else if('fulldetail' in req.query) {
      groupAddons = "$$ROOT";
      project["courses"] = "$courses";
    }

    // console.log(groupIDmap);
    // console.log(groupAddons);
    // console.log(project);

    aggregateArray.push({$match: filter});
    aggregateArray.push({$group: {"_id" : groupIDmap, "courses" : {"$push" : groupAddons}}});
    aggregateArray.push({$project: project});
    aggregateArray.push({$sort: sort});
  }

  // console.log(JSON.stringify(aggregateArray, null, 2));
  Detail.aggregate(aggregateArray).exec()
    .then(detail => {
      //console.log(JSON.stringify(detail, null, 2));
      res.json(detail);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json('Error: ' + err);
  });


});

router.route('/add').post((req, res) => { // adding courses and respective info
  console.log("in the route") 
  const name = req.body.name;
  const course_id = req.body.course_id;
  const instructor = req.body.instructor;
  const ge = req.body.ge;
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
  const I = Number(req.body.I);
  const P = Number(req.body.P);
  const NP = Number(req.body.NP);
  const Y = Number(req.body.Y);
  const quarter = req.body.quarter;
  const units = req.body.units;
  const enrollment = Array(req.body.enrollment);

  const newDetail = new Detail({
    name,
    course_id,
    instructor,
    ge,
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
    I,
    P,
    NP,
    Y,
    quarter,
    units,
    enrollment,
  });

  console.log(newDetail);

  newDetail.save()
  .then(() => res.json('Detail added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { // finding courses by id
  Detail.findById(req.params.id)
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { // deleting courses by id
  Detail.findByIdAndDelete(req.params.id)
    .then(() => res.json('Course deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { // updating course information
  Detail.findById(req.params.id)
    .then(detail => {
      detail.name = req.body.name;
      detail.course_id = req.body.course_id;
      detail.instructor = req.body.instructor;
      detail.ge = req.body.ge;
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
      detail.I = Number(req.body.I);
      detail.P = Number(req.body.P);
      detail.NP = Number(req.body.NP);
      detail.Y = Number(req.body.Y);
      detail.quarter = req.body.quarter;
      detail.units = req.body.units;
      detail.enrollment = Array(req.body.enrollment);

      detail.save()
        .then(() => res.json('Detail updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;