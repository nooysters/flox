const storage = require('electron-json-storage')
const _ = require('underscore')
const shell = require('electron').shell;

let buildLinks = () => {
  let quickLinkList = document.getElementById('quicklinks-view')
  let html = ''

  storage.get('quicklinks', (error, data) => {
    if (error) throw error

    _(data).each((item) => {
      let url = `https://${item['http-username']}:${item['http-password']}@${item.url}`
      html += `<li><a href="${url}"  class='quick-link'>${item.url}</a></li>`
    })
    quickLinkList.innerHTML = html

    _(document.getElementsByClassName('quick-link')).each((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        shell.openExternal(link.href);
      })
    })
  })
}

buildLinks()
