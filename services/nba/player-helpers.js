const NBA = require('nba');

function getPlayer(req,res,next) {
 console.log('inside getPlayer')
 console.log(req.query);
 let name = req.query.q;
  console.log(req.query.q);
 const findPlayer = NBA.findPlayer(name);
  NBA.stats.playerInfo({ PlayerID: findPlayer.playerId })
 .then(stat => {
   const player = {
    firstname: stat.commonPlayerInfo[0].firstName,
    lastname: stat.commonPlayerInfo[0].lastName,
    position: stat.commonPlayerInfo[0].position,
    country: stat.commonPlayerInfo[0].country,
    jersey: stat.commonPlayerInfo[0].jersey,
    ppg: stat.playerHeadlineStats[0].pts,
    apg: stat.playerHeadlineStats[0].ast,
    rpg: stat.playerHeadlineStats[0].reb
                   
 }
   console.log(player);
    res.locals = player;
   next();
   
}).catch((err) => {
    console.log(err);
    next();
   });
}

module.exports = {
 getPlayer
};