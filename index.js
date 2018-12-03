#!/usr/bin/env node
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routesMiddleware = require('next-routes-middleware')
const port = parseInt(process.env.PORT, 10) || 3000
const {join} = require('path')
const currentPath = process.cwd()
console.log(currentPath)
const config = require(join(currentPath, 'now.dev.json'))
app.prepare().then(() => {
  
  const server = express()
  
  routesMiddleware({server, app, config})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
