const select = document.querySelector('select')
// 选择的主题
let selectedTheme = localStorage.getItem('theme') || 'light'
select.value = selectedTheme

// @media (prefers-color-scheme: dark) { }
const prefers = window.matchMedia('(prefers-color-scheme: dark)')
let osTheme = prefers.matches ? 'dark' : 'light'
prefers.onchange = (e) => {
  osTheme = e.matches ? 'dark' : 'light'
  handleThemeChange()
}

function handleThemeChange() {
  const theme = selectedTheme === 'os' ? osTheme : selectedTheme
  document.body.dataset['theme'] = theme
}

select.onchange = (e) => {
  selectedTheme = e.target.value
  localStorage.setItem('theme', selectedTheme)
  handleThemeChange()
}