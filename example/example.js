const res = await fetch('/gh/repos/Colourlessglow/preview-serve')
const json = await res.json()
const text = JSON.stringify(json, null, 2)
document.body.firstChild.textContent = text
