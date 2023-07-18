const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const routes = require('../api/routes');

const modules = (app) => {
    app.use(cors({origin:'*'}));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookie());
    app.use('/api', routes);
    // app.use(express.static(process.cwd() + '/src/public'));

    // app.set('view engine', 'ejs');
    // app.set('views', 'src/views');
}

module.exports = modules;