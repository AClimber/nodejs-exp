const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const coursesRouter = require('./routes/courses');
const aboutRouter = require('./routes/about');
const cardRouter = require('./routes/card');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//register hbs engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
//
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/add', addRouter);
app.use('/courses', coursesRouter);
app.use('/card', cardRouter);

const PORT = process.env.PORT ||3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
