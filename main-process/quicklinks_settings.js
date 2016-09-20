const storage = require('electron-json-storage')
const _ = require('underscore')

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

removeLink = (key) => {
  storage.get('quicklinks', (error, data) => {
    delete data[key]
    storage.set('quicklinks', data, (error) => {
      if (error) throw error;
      reRenderView()
    });
  })
  return false
}

let buildForm = () => {
  storage.get('quicklinks', (error, data) => {
    let html = ""
    _(data).each((link) => {
      html += `<tr><td>${link.url}</td>
        <td>${link['http-username']}</td>
        <td>${link['http-password']}</td>
        <td><a class='remove-link' data-key='${link.url}'>remove</a></td>
        </tr>`
    })

    document.getElementById('quicklinks-config').innerHTML = html

    elements = document.getElementsByClassName('remove-link');
    for(var i = 0, len = elements.length; i < len; i++) {
      elements[i].onclick = function (o) {
        removeLink(this.dataset.key)
      }
    }
  })
}

let saveSettings = (values) => {
  storage.get('quicklinks', (error, data) => {
    if (error) throw error;

    data[values.url] = values

    storage.set('quicklinks', data, (error) => {
      if (error) throw error;
      reRenderView()
    });
  })
}

let reRenderView = ()=>{
  buildForm()
}

reRenderView()
