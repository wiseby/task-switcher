/* eslint-disable */
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
/* eslint-enable */

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

ipcMain.on('WRITE_FILE', (event, args) => {
  console.log('Receiving a request form frontend')
  console.log('args: ', args)
  fs.writeFile(`./data/${args.file}`, JSON.stringify(args.data), (error) => {
    if (error) {
      const errorMessage = `An error occured when writing file ${args.file} : ${error}`
      console.log(errorMessage)
      win.webContents.send('WRITE_FILE', { operationResponse: { message: errorMessage, status: 'error' }})
    } else {
      win.webContents.send('WRITE_FILE', { operationResponse: { message: '', status: 'success' }})
    }
  })
});

ipcMain.on('READ_FILE', (event, args) => {
  console.log('Receiving a request form frontend')
  console.log('args: ', args)
  fs.readFile(`./data/${args.file}`, (error, data) => {
    if (error) {
      const errorMessage = `An error occured when reading file ${args.file} : ${error}`
      console.log(errorMessage)
      win.webContents.send('READ_FILE', { message: errorMessage, status: 'error' })
    } else {
      const jobs = JSON.parse(data);
      win.webContents.send('READ_FILE', { data: jobs, message: '', status: 'success' })
    }
  })
});