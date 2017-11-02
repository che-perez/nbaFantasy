const Team = require('../models/Team');

const teamController = {};

teamController.index = (req, res) => {
 Team.findAll(req.user.id)
 .then(team => {
  res.status(200).render('team/team-index', {
    auth: (req.user) ? true : false,
    user: req.user,
   team: team,
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

teamController.show = (req, res) => {
 Team.findById(req.params.id)
 .then(team => {
  res.status(200).render('team/team-single', {
   team: team,
   auth: (req.user) ? true : false,
   current_user: (req.user) ? req.user.id : 0,
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

teamController.create = (req, res) => {
 Team.create({
  teamname: req.body.teamname,
  picture_url: req.body.picture_url,
  ownername: req.body.ownername,
  wins: req.body.wins,
  losses: req.body.losses,
  }, req.user.id)
  .then(team => {
    res.redirect(`/team/${team.id}`)
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

teamController.edit = (req, res) => {
 Team.findById(req.params.id)
 .then(team => {
  res.status(200).render('team/team-edit', {
   team: team,
   auth: (req.user) ? true : false,
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

teamController.update = (req, res) => {
 Team.update({
   teamname: req.body.teamname,
  picture_url: req.body.picture_url,
  wins: req.body.wins,
  losses: req.body.losses,
 }, req.params.id)
 .then(team => {
  res.redirect(`/team/${team.id}`)
  }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

teamController.delete = (req, res) => {
 Team.destroy(req.params.id)
 .then(() => {
  res.redirect('/team');
}).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};


module.exports = teamController;