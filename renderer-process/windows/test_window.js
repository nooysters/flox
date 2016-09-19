const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const path = require('path')
var _ = require('underscore');

const newWindowBtn = document.querySelectorAll('button.new-window')

  _.each(newWindowBtn, (button)=> {

    button.addEventListener('click', function (event) {
    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    let url = 'https://' + this.dataset.username + ':' + this.dataset.password + '@' + this.dataset.url

    let win = new BrowserWindow({
      width: width / 2,
      height: height,
      x:0,
      y:0
    })

    win.on('close', function () { win = null })
    win.loadURL(url)

    win.once('ready-to-show', ()=> {
      win.show()
    })
  })
})
