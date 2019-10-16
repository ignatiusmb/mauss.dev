;(async function() {
  // Random Profile Picture
  const random = scramble.random(0, 2)
  let url = `https://cdn.imbagus.com/assets/images/avatar${random}.jpg`
  let response = await fetch(url)
  let data = await response.blob()
  const profile = document.createElement('img')
  profile.src = URL.createObjectURL(data)
  profile.alt = 'Profile Picture'
  document.getElementById('display-pic').appendChild(profile)

  // Skills Logos
  let ext
  for (const logo of document.querySelectorAll('.logo')) {
    const iconName = logo.querySelector('span').textContent.toLowerCase()
    if (!logo.dataset.format) ext = 'svg'
    else ext = logo.dataset.format
    url = `https://cdn.imbagus.com/assets/icons/${iconName}.${ext}`
    response = await fetch(url)
    data = await response.blob()
    const icon = document.createElement('img')
    icon.src = URL.createObjectURL(data)
    logo.appendChild(icon)
  }
})()

const heading = document.querySelector('header h1')
const instance = scramble(heading)
instance.run()
const setShadow = setInterval(() => {
  if (instance.finished()) {
    clearInterval(setShadow)
    heading.style.textShadow = '6px 3px 9px rgba(0, 0, 0, 0.3)'
  }
}, 700)
