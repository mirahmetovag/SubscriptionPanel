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
}

module.exports = modules;