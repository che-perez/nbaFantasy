const Player = require('../models/Player');

const playerController = {};

playerController.index = (req, res) => {
 Player.findAll(req.user.id)
 .then(player => {
  res.status(200).render('player/player-index', {
    auth: (req.user) ? true : false,
    user: req.user,
   player: player,
  })
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

playerController.show = (req, res) => {
 Player.findById(req.params.id)
 .then(player => {
  res.status(200).render('player/player-single', {
   player: player,
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

playerController.create = (req, res) => {
 console.log(req.team);
  Player.create({
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  position: req.body.position,
   headshot_url: req.body.headshot_url,
   country: req.body.country,
   jersey: req.body.jersey,
  ppg: req.body.ppg,
  apg: req.body.apg,
  rpg: req.body.rpg,
  }, req.params.id)
  .then(player => {
    res.redirect(`/player/${player.id}`)
 }).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};

playerController.delete = (req, res) => {
 Player.destroy(req.params.id)
 .then(() => {
  res.redirect('/player');
}).catch(err => {
  console.log(err);
  res.status(500).json({
   error: err
  });
 });
};


module.exports = playerController;