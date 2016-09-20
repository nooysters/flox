const electron = require('electron')
const path = require('path')
const ipc = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray
const storage = require('electron-json-storage')
const _ = require('underscore')
const shell = require('electron').shell;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({show: false})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // Open the DevTools.

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on('put-in-tray', function (event) {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : '16x16.png'
  const iconPath = path.join(__dirname,'assets', 'app-icon', 'pngs', iconName)

  appIcon = new Tray(iconPath)

  let items = getQuickLinks().then((data)=>{

    data.push({
      label: 'Configure',
      click: () => {
        event.sender.send('open-config-window')
      }
    })

    const contextMenu = Menu.buildFromTemplate(data)
    appIcon.setToolTip('in the tray nukka.')
    appIcon.setContextMenu(contextMenu)
  })

})

let getQuickLinks = () => {
  return new Promise( (fulfill, reject) => {
    storage.get('quicklinks', (error, data) => {

      if (error) throw error

      let items = _(data).reduce((arr, item)=>{
        arr.push({
          label: item.url,
          click: (event) => {
            let url = `https://${item['http-username']}:${item['http-password']}@${item.url}`
            shell.openExternal(url)
          }
        })
        return arr
      }, [])

      fulfill(items)
    })
  })
}
