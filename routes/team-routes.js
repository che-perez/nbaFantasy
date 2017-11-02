const express = require('express');
const teamRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const playerHelpers = require('../services/nba/player-helpers');
const teamController = require('../controllers/team-controller');
const playerController = require('../controllers/player-controller')

teamRouter.get('/', authHelpers.loginRequired, teamController.index);
teamRouter.post('/', authHelpers.loginRequired, teamController.create);

teamRouter.get('/new', authHelpers.loginRequired, (req, res) => {
 res.render('team/team-new', {auth: (req.user) ? true : false});
});

teamRouter.get('/:id/add', authHelpers.loginRequired, (req, res) => {
 res.render('team/player-add', {teamid: req.params.id, auth: (req.user) ? true : false});
});

teamRouter.get('/:id/create', playerHelpers.getPlayer, (req, res) => {
 res.render('team/player-create', {teamid: req.params.id,player: res.locals,auth: (req.user) ? true : false});
});

teamRouter.post('/:id/player', playerController.create);

teamRouter.get('/:id',teamController.show);
teamRouter.get('/:id/edit', authHelpers.loginRequired, teamController.edit);
teamRouter.put('/:id', authHelpers.loginRequired, teamController.update);

teamRouter.delete('/:id', authHelpers.loginRequired, teamController.delete);

module.exports = teamRouter;