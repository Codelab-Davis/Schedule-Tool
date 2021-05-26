const router = require('express').Router();
let Detail = require('../models/detail.model');


router.route('/grades').get((req, res) => {
  console.log("in /grades route");
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
  });s
});

router.route('/').get((req, res) => {
  var filter = {};
  var projections = null;
  var options = {};

  if("start" in req.query && "limit" in req.query){
    options.skip = parseInt(req.query.start);
    options.limit = parseInt(req.query.limit);
  }

  if(("filter" in req.query) && (req.query.filter.length > 0)) {
    filter.name = {"$regex": req.query.filter, "$options": "i"};
  }

  if(("instructor" in req.query) && (req.query.instructor.length > 0)) {
    filter.instructor = {"$regex": req.query.instructor, "$options": "i"};
  }

  if(("crn" in req.query) && (req.query.crn.length > 0)) {
    filter.crn = {"$regex": req.query.crn, "$options": "i"};
  }

  if(("subj" in req.query) && (req.query.subj.length > 0)) {
    filter.subj = {"$regex": req.query.subj, "$options": "i"};
  }

  if(("code" in req.query) && (req.query.code.length > 0)) {
    filter.code = {"$regex": req.query.code, "$options": "i"};
  }

  if(("units" in req.query) && (req.query.units.length > 0)) {
    filter.units = {"$regex": req.query.units, "$options": "i"};
  }

    if(("fall" in req.query) && (req.query.fall.length > 0)) {
      req.query.quarter = req.query.fall + req.query.year;
      if (filter.$or) {
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
      else {
        filter.$or = [];
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
    }

    if(("winter" in req.query) && (req.query.winter.length > 0)) {
      req.query.quarter = req.query.winter + req.query.year
      if (filter.$or) {
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
      else {
        filter.$or = [];
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
    }
    
    if(("spring" in req.query) && (req.query.spring.length > 0)) {
      req.query.quarter = req.query.spring + req.query.year
      if (filter.$or) {
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
      else {
        filter.$or = [];
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
    }

    if(("ss1" in req.query) && (req.query.ss1.length > 0)) {
      req.query.quarter = req.query.ss1 + req.query.year
      if (filter.$or) {
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
      else {
        filter.$or = [];
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
    }

    if(("ss2" in req.query) && (req.query.ss2.length > 0)) {
      req.query.quarter = req.query.ss2 + req.query.year
      if (filter.$or) {
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
      else {
        filter.$or = [];
        filter.$or.push({quarter: {"$regex": req.query.quarter, "$options": "i"}});
      }
    }

    // console.log("hit quarter", req.query.quarter, req.query.year)

    // case where it is year only
    if (!req.query.quarter && "year" in req.query && req.query.year != "No Year" && req.query.year != "") {
      req.query.quarter = req.query.year;
      filter.$or = [({quarter: {"$regex": req.query.quarter, "$options": "i"}})];
    }

    // now dealing with GE's

    if (req.query.acgh == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'ACGH'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'ACGH'});
      }
    }

    if (req.query.dd == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'DD'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'DD'});
      }
    }
    
    if (req.query.ol == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'OL'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'OL'});
      }
    }

    if (req.query.ql == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'QL'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'QL'});
      }
    }

    if (req.query.sl == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'SL'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'SL'});
      }
    }

    if (req.query.vl == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'VL'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'VL'});
      }
    }

    if (req.query.wc == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'WC'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'WC'});
      }
    }

    if (req.query.we == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'WE'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'WE'});
      }
    }

    if (req.query.ah == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'AH'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'AH'});
      }
    }

    if (req.query.se == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'SE'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'SE'});
      }
    }

    if (req.query.ss == "yes") {
      if (filter.$and) {
        filter.$and.push({ge_list: 'SS'});
      } else {
        filter.$and = [];
        filter.$and.push({ge_list: 'SS'});
      }
    }

  // console.log("filter", filter);

  Detail.find(filter, projections, options)
    .then(detail => res.json(detail))
    .catch(err => res.status(400).json('Error: ' + err));
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
      detail.enrollment = Array(req.body.enrollment);

      detail.save()
        .then(() => res.json('Detail updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;