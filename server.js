const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(methodOverride('-method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

app.set('views', path.join(__dirname,'views'));

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port,() => {
 console.log(`knock knock ${port}`)
})

app.get('/', (req,res) => {
 res.render('index')
})

//const fantasyRoutes = require('./routes/fantasy-routes');
//app.use('/fantasy',fantasyRoutes);

app.get('*',(req, res) => {
 res.status(404).send('404')
});