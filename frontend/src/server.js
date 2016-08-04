const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, '/../index.html')
    const publicPath = express.static(path.join(__dirname, '/../public'))
    const stylePath = express.static(path.join(__dirname,'/../style'));
    const imagesPath = express.static(path.join(__dirname,'/../images'))

    app.use('/public', publicPath)
    app.use('/style', stylePath)
    app.use('/images', imagesPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
