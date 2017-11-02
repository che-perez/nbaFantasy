const express = require('express');
const playerRouter = express.Router();
const playerHelpers = require('../services/nba/player-helpers');
const authHelpers = require('../services/auth/auth-helpers');
const playerController = require('../controllers/player-controller');

playerRouter.get('/', authHelpers.loginRequired, playerController.index);
playerRouter.post('/', authHelpers.loginRequired, playerController.create);

//playerRouter.get('/add', authHelpers.loginRequired, (req, res) => {
// res.render('player/player-add', {auth: (req.user) ? true : false});
//});
//playerRouter.get('/create', playerHelpers.getPlayer, (req, res) => {
// res.render('player/player-create', {player: res.locals});
//});

playerRouter.get('/:id', authHelpers.loginRequired, playerController.show);


playerRouter.delete('/:id', authHelpers.loginRequired, playerController.delete);

module.exports = playerRouter;