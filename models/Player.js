const db = require('../db/config');

const Player = {};

Player.findAll = (id) =>
  db.query(`
    SELECT * FROM players
    WHERE team_id = $1
  `, [id]);

Player.findById = id =>
  db.one('SELECT * FROM players WHERE id = $1',[id])

Player.create = (player, teamid) => {
 return db.one(`
     INSERT INTO players (
       firstname,
       lastname,
       position,
       headshot_url,
       country,
       jersey,
       ppg,
       apg,
       rpg,
       team_id
) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
       [player.firstname, player.lastname, player.position, player.headshot_url, player.country, player.jersey, player.ppg, player.apg, player.rpg, teamid]);
};

Player.destroy = id => {
 return db.none(`
    DELETE FROM players
    WHERE id = $1`, [id]);
};

module.exports = Player