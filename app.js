// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

const MONGODB_URL =process.env.MONGODB_URL || "mongodb://localhost/lab-express-basic-auth";
// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// configure 
const session =require("express-session");
const MongoStore = require("connect-image");

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24},
        resave:true,
        saveUninitialized : true,
        store: MongoStore.create({
            mongoUrl: MONGODB_URI
        })
    })
)

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const auth = require("./routes/auth");
app.use("/",auth)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

