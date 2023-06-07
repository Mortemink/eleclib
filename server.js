if (process.env.npm_lifecycle_event === 'devStart') {
    //console.log(`dev mode enabled (${process.env.npm_lifecycle_event})`)
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

initializePassport(passport,
        login => users.findOne({login: login}),
        id => users.findOne({_id: id}))

async function start() {
    try {
        const DB = 'mongodb://127.0.0.1:27017/eleclib';
        console.log('Connecting to MongoDB: ' + DB);
        mongoose.set('strictQuery', false);
        await mongoose.connect(DB, {
            useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true
        })
            .then(() => console.log('Succesful connection to MongoDB'))
            .catch((err) => {
                if (err) throw new Error(err);
            });

        const PORT = 3011;
        app.listen(PORT, () => {
            console.log(`Link to site: http://localhost:${PORT}`);
        })

    } catch (e) {
        console.log('Error: \n', e);
    }
}

start();

app.use(bodyParser.urlencoded({extended: true}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET || 'CHMONYA', resave: false, saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


/* Запросы */


app.get('/', async (req, res) => {
    res.render('index.ejs', {
        user: await req.user || false, title: 'ElecLib'
    })
})

app.get('/fantasy', async (req, res) => {
    res.render('pages/fantasy.ejs', {
        user: await req.user || false
    })
})

app.get('/fantastic', async (req, res) => {
    res.render('pages/fantastic.ejs', {
        user: await req.user || false
    })
})

app.get('/adventure', async (req, res) => {
    res.render('pages/adventure.ejs', {
        user: await req.user || false
    })
})

app.get('/mystic', async (req, res) => {
    res.render('pages/mystic.ejs', {
        user: await req.user || false
    })
})

app.get('/new', async (req, res) => {
    res.render('pages/new.ejs', {
        user: await req.user || false
    })
})

app.get('/popular', async (req, res) => {
    res.render('pages/popular.ejs', {
        user: await req.user || false
    })
})

app.get('/book_page', (req, res) => {
    res.render('book_page.ejs')
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}


app.get('/profile', checkAuthenticated, async (req, res) => {
    res.render('profile.ejs', {
        user: await req.user || false
    })
})

app.post('/profile', checkAuthenticated, async (req, res) => {
    const user = {
        email: await req.body.email,
        login: await req.body.login
    }
    res.render('profile.ejs', {
        user
    })
})


app.delete('/logout', checkAuthenticated, (req, res) => {
    req.logOut(null, (err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
})


app.get('/admin', async (req, res) => {
    res.render('admin.ejs', {
        user: await req.user || false
    })
})




function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.route('/login')
    .get(checkNotAuthenticated, async (req, res) => {
        try {
            const registrationMessage = await req.query.status === 'successful_register' ? 'Регистрация выполнена успешно!' : false;
            res.render('auth/login.ejs', {
                registrationMessage
            })
        } catch (e) {
            console.error(e)
            res.redirect('/')
        }

    })
    .post(checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login', failureFlash: true
    }))

app.route('/register')
    .get(checkNotAuthenticated, async (req, res) => {
        try {
            let message = await req.query.status;
            if (message === 'already_exist') {
                message = 'Пользователь с данным логином/почтой уже существует!'
            } else if (message === 'error') {
                message = 'Произошла неизвестная ошибка.'
            }
            res.render('auth/register.ejs', {
                message
            })
        }
        catch {
            res.redirect('/register')
        }

    })
    .post(checkNotAuthenticated, async (req, res) => {
        try {
            const userExist = await users.findOne({ login: req.body.login })
            if (!userExist) {
                res.redirect('/login?status=successful_register')
                const hashedPassword = await bcrypt.hash(req.body.password, 12)
                const user = await users({
                    login: req.body.login, email: req.body.email, password: hashedPassword,
                    accountType: 0, creationDate: Date.now()
                })
                user.save()
            } else {
                res.redirect('/register?status=already_exist')
            }
        } catch {
            res.redirect('/register?status=error')
        }
    })