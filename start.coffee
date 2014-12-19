#!/usr/bin/env coffee
runCommand = require('run-command')
dotenv     = require('dotenv')
dotenv.load()

console.log("[NODE_ENV] " + process.env.NODE_ENV)
runCommand("coffee", ['app.coffee'])

if (process.env.NODE_ENV == "development")
  runCommand("gulp", ['watch'])
else
  runCommand("gulp")
