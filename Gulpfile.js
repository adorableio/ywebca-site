'use strict';

// Make sure a bower components directory exists
// Side-effect of not having any bower dependencies
var fs = require('fs');
var data = fs.readFileSync('./.bowerrc', 'utf-8');
var bowerDirectory = JSON.parse(data).directory;
if (!fs.existsSync(bowerDirectory)) { fs.mkdirSync(bowerDirectory); }

// Setup gulp
require('./gulp/index');
