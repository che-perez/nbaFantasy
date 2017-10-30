// Require models
const Fantasy = require('../models/Fantasy');

// Create controllers
const fantasyController = {};

// Find all controller
fantasyController.index = (req, res) => {
  Fantasy.findAll()
   .then((fantasy) => {
    res.status(200).render('fantasy/fantasy-index', {
      fantasy: fantasy,
    })
   }).catch(err => {
  console.log(err);
  res.status(500).json({error:err});
 });
};

// Select by id controller
fantasyController.show = (req,res) => {
  Fantasy.findById(req.params.id)
    .then((fantasy) => {
      res.status(200).render('fantasy/fantasy-single',{
        flashcard: fantasy
      })
   }).catch(err => {
  console.log(err);
  res.status(500).json({error:err});
 });
};
// Create controller
fantasyController.create = (req,res) => {
  Fantasy.create({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    difficulty: req.body.difficulty,
  }).then((fantasy)=>{
    res.redirect(`/fantasy/${fantasy.id}`)
  }).catch(err => {
  console.log(err);
  res.status(500).json({error:err});
 });
};

// Create edit controller
fantasyController.edit = (req, res) => {
 Fantasy.findById(req.params.id)
 .then(fantasy => {
  res.status(200).render('fantasy/fantasy-edit', {
   flashcard: fantasy,
  });
 }).catch(err => {
  console.log(err);
  res.status(500).json({error:err});
 });
};

// Update controller
fantasyController.update = (req,res) => {
  Fantasy.update({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
    difficulty: req.body.difficulty,
  }, req.body.id)
  .then(fantasy => {
    res.redirect(`/fantasy/${fantasy.id}`)
  }).catch(err => {
  console.log(err);
  res.status(500).json({error:err});
 });
};

// Delete controller
fantasyController.delete = (req, res) => {
  Fantasy.destroy(req.params.id)
   .then(() => {
   res.redirect('/fantasy');
  }).catch(err => {
      res.status(500).json({
       err,
    });
});
};

// exports controller
module.exports = fantasyController