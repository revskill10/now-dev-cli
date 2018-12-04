#!/usr/bin/env node
const dotenv = require('dotenv')
dotenv.config()
let argv = require('minimist')(process.argv.slice(2));
const prefix = argv['prefix'] || ''
const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routesMiddleware = require('next-routes-middleware')
const port = parseInt(process.env.PORT, 10) || 3000
const {join} = require('path')
const currentPath = process.cwd()
const config = require(join(currentPath, 'now.config.js'))
app.prepare().then(() => {
  const server = express()
  routesMiddleware({server, app, config, prefix})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
