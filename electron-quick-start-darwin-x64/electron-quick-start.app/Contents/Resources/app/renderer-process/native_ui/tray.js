const ipc = require('electron').ipcRenderer

ipc.send('put-in-tray')
