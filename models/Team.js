const db = require('../db/config');

const Team = {};

Team.findAll = (id) =>
  db.query(`
    SELECT * FROM users JOIN teams ON users.id = teams.user_id
    WHERE user_id = $1
  `, [id]);

Team.findById = id =>
  db.one(' SELECT * FROM users JOIN teams ON users.id = teams.user_id WHERE user_id = $1',[id])

Team.create = (team, userid) => {
 return db.one(`
     INSERT INTO teams (
     teamname,
     picture_url,
     ownername,
      user_id
) 
VALUES ($1,$2,$3,$4)
     RETURNING *`,
       [team.teamname, team.picture_url, team.ownername, userid]);
};

Team.update = (team, id) => {
 return db.one(`
   UPDATE teams SET 
    teamname = $1,
   picture_url = $2,
   ownername = $3
    WHERE id = $4
    RETURNING *`, [team.teamname, team.picture_url, team.ownername, id]);
}

Team.destroy = id => {
 return db.none(`
    DELETE FROM teams
    WHERE id = $1`, [id]);
};

module.exports = Team