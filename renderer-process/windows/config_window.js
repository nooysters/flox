const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const path = require('path')
const _ = require('underscore');
const ipc = require('electron').ipcRenderer


const newWindowBtn = document.getElementById('config-window')

ipc.on('open-config-window', function (event) {
  let configuration = {}
  let modalPath = path.join('file://', __dirname, '../../sections/windows/config_window.html')

  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  let win = new BrowserWindow({
    width: 600,
    height: 500,
    modal: true
  })

  win.on('close', function () { win = null })
  win.loadURL(modalPath)

  win.once('ready-to-show', ()=> {
    win.show()
  })
})
