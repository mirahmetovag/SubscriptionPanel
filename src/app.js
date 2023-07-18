const express = require('express');
const app = express();

const run = require('./start/run');
const modules = require('./start/modules');

run(app);
modules(app);