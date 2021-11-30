const { contextBridge, ipcRenderer } = require('electron')
console.log('Running preload script')
const validChannels = ['READ_FILE', 'WRITE_FILE']
contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, func) => {
        if (validChannels.includes(channel)) {
            // Strip event as it includes `sender` and is a security risk
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    },
})
