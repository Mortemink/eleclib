if (process.env.npm_lifecycle_event == 'devStart') {
    console.log(`dev mode enabled (${process.env.npm_lifecycle_event})`)
    require('dotenv').config()
}

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const users = require("./models/User");

const initializePassport = require('./passport-config');

initializePassport(
    passport,
    login => users.findOne({ login: login }),
    id => users.findOne({ _id: id }),
)

async function start() {
    try {
        const DB = 'mongodb://127.0.0.1:27017/eleclib';
        console.log('Connecting to MongoDB: ' + DB);
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            autoIndex: false,
            useUnifiedTopology: true
        });
        console.log('Succesful connection to MongoDB');

        const PORT = 3011;
        app.listen(PORT, () => {
            console.log(`Link to site: localhost:${PORT}`);
        })

    }   catch (e) {
        console.log('Error: \n', e);
    }
}
start();
 
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET || 'CHMONYA',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    res.render('index.ejs', {
        user: await req.user || false, title: 'ElecLib'
    })
})

app.get('/fantasy', async (req, res) => {
    res.render ('pages/fantasy.ejs', {
        user: await req.user || false
    })
})

app.get('/fantastic', async (req, res) => {
    res.render ('pages/fantastic.ejs', {
        user: await req.user || false
    })
})

app.get('/adventure', async (req, res) => {
    res.render ('pages/adventure.ejs', {
        user: await req.user || false
    })
})

app.get('/mystic', async (req, res) => {
    res.render ('pages/mystic.ejs', {
        user: await req.user || false
    }) 
})

app.get('/new', async (req, res) => {
    res.render ('pages/new.ejs', {
        user: await req.user || false
    }) 
})

app.get('/popular', async (req, res) => {
    res.render ('pages/popular.ejs', {
        user: await req.user || false
    }) 
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('auth/login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('auth/register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const user = await users({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword
        })
        user.save()

        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', checkAuthenticated, (req, res) => {
    req.logOut(),
    res.redirect('/')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    } 
    next()
}