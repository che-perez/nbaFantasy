DROP TABLE players;
DROP TABLE teams;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
 username VARCHAR(255) NOT NULL UNIQUE,
 password_digest TEXT NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
 firstname VARCHAR(255) NOT NULL,
 lastname VARCHAR(255) NOT NULL
 );
 
 CREATE TABLE IF NOT EXISTS teams (
 id SERIAL PRIMARY KEY,
 teamname VARCHAR(255) NOT NULL,
  picture_url TEXT,
  ownername VARCHAR(255),
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  user_id INTEGER REFERENCES users(id)
 );
 
 CREATE TABLE IF NOT EXISTS players (
 id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  position TEXT,
  headshot_url TEXT,
  country VARCHAR(255),
  jersey INTEGER,
  ppg DECIMAL,
  apg DECIMAL,
  rpg DECIMAL,
  team_id INTEGER REFERENCES teams(id),
  CONSTRAINT uq_player UNIQUE(firstname, lastname)
  );