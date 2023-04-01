const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({
  // // Specify the folder for partials
  // partialsDir: 'views/partials',
  // // Specify the layout template
  // defaultLayout: 'main',
});

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on Port 3000'));
});
////
