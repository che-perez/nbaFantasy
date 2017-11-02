const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('dotenv').config();

app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`knock knock ${port}`);
});

app.get('/', (req, res) => {
  res.render('index',{auth: (req.user) ? true : false});
});

const teamRoutes = require('./routes/team-routes')
app.use('/team', teamRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

const playersRoutes = require('./routes/player-routes');
app.use('/player', playersRoutes);

app.get('*', (req, res) => {
 res.status(404).send('404');
});