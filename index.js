const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const coursesRouter = require('./routes/courses');
const aboutRouter = require('./routes/about');
const cardRouter = require('./routes/card');
const ordersRouter = require('./routes/orders');

const User = require('./models/user');

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

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e58c6c4bc628b3548eb4dc6');
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }

});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/add', addRouter);
app.use('/courses', coursesRouter);
app.use('/card', cardRouter);
app.use('/orders', ordersRouter);

const PORT = process.env.PORT ||3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

async function start() {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'user@email.com',
                name: 'User',
                cart: {items:[]}
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
