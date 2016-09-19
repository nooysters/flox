const storage = require('electron-json-storage')
const _ = require('underscore')
const settingsFile = 'settings'

let settingsContainer = document.getElementById('quicklinks-config')
let newLink = document.querySelector('button')

newLink.addEventListener('click', (e) => {
  let values = _(document.querySelectorAll('input')).reduce((acc, item)=>{
    acc[item.name] = item.value
    return acc
  }, {})

  saveSettings(values)
  return false
})

let buildForm = () => {
  let links = fetchSettings()
  let html = ""
  console.log(links)
  _(links).each((link) => {
    html += `<tr><td>${link.url}</td><td>${link.username}</td><td>${link.password}</td></tr>`
  })
  document.getElementById('quicklinks-config').innerHTML(html)
}

let fetchSettings = () => {
  return storage.get('quicklinks', (error, data) => {
    console.log(error)
    console.log(data)
    return data
  })
}

let saveSettings = (values) => {
  storage.get('quicklinks', (error, data) => {
    if (error) throw error;

    data[values.url] = values

    storage.set('quicklinks', data, (error) => {
      if (error) throw error;
    });
  })
}
buildForm()
