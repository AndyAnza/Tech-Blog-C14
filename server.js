const sequelize = require('./config/connection');
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const hbs = handlebars.create({
  // Specify the folder for partials
  partialsDir: 'views/partials',
  // Specify the layout template
  defaultLayout: 'views/layouts',
});

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// app.get('/', function (req, res) {
//   res.render('main');
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on Port 3000'));
});
