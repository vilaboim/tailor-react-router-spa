'use strict'

const http = require('http')
const Tailor = require('node-tailor')
const path = require('path')
const fetchTemplate = require('node-tailor/lib/fetch-template')

const tailor = new Tailor({
  templatesPath: __dirname + '/templates',
  fetchTemplate: fetchTemplate(
    path.join(__dirname, 'templates'),
    () => 'base-template'
  )
})

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' })
      return res.end('')
    }

    tailor.requestHandler(req, res)
  })
  .listen(8080, function () {
    console.log('Tailor server listening on port 8080')
  })
