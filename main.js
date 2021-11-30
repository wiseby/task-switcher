const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

async function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  })

  win.loadFile('./dist/index.html')
}
app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on('READ_FILE', (event, args) => {
  console.log('Receiving a request form frontend')
  console.log('event: ', event)
  console.log('args: ', args)
  fs.readFile('./data/test.json', (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send('READ_FILE', JSON.parse(data).message)
  })
})
