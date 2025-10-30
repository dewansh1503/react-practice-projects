import { useEffect, useState } from 'react'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('Theme') ?? 'system')

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme:Dark)')

    function applyTheme() {
      const html = document.documentElement
      localStorage.setItem('Theme', theme)

      if (theme === 'dark' || (theme == 'system' && prefersDark.matches)) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
    applyTheme()
    if (theme == 'system') {
      prefersDark.addEventListener('change', applyTheme)

      return () => {
        prefersDark.removeEventListener('change', applyTheme)
      }
    }
  }, [theme])

  return (
    <>
      <div className="h-screen bg-blue-500 dark:bg-slate-900">
        <button
          className="border-2 border-blue-900 p-5 text-4xl text-amber-400"
          onClick={() => {
            setTheme('dark')
          }}
        >
          Dark mode
        </button>
        <button
          className="border-2 border-blue-900 p-5 text-4xl text-amber-400"
          onClick={() => {
            setTheme('light')
          }}
        >
          light mode
        </button>
        <button
          className="border-2 border-blue-900 p-5 text-4xl text-amber-400"
          onClick={() => {
            setTheme('system')
          }}
        >
          system
        </button>
        <h1 className="text-6xl dark:text-white">{theme}</h1>
      </div>
    </>
  )
}

export default App
