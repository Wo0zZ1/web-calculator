class ThemeManager {
	constructor() {
		this.root = document.documentElement

		this.themeButton = document.getElementById('theme-button')

		this.themeContent = document.getElementById('theme-content')

		this.sun = document.getElementById('theme-icon-sun')
		this.moon = document.getElementById('theme-icon-moon')

		this.themeData = {
			light: {
				primary: '#006ff1',
				secondary: '#374353',
				shadow: '#ebefff',
				hover: '#2c364226',
				active: '#2c364240',
				alternate: '#ababab',
				bg: '#fafbff',
			},
			dark: {
				primary: '#93a8fe',
				secondary: '#ffffff',
				shadow: '#313D4E',
				hover: '#2c364245',
				active: '#2c364260',
				alternate: '#ababab',
				bg: '#374353',
			},
		}

		this.#bindEvents()

		this.#render()
	}

	#createEvent(fn) {
		return () => {
			fn()
			this.#render()
		}
	}

	#bindEvents() {
		this.themeButton.onclick = this.#createEvent(() => {
			if (store.state.theme === 'light') store.set('theme', 'dark')
			else store.set('theme', 'light')
		})
	}

	#render() {
		for (const [key, value] of Object.entries(
			this.themeData[store.state.theme],
		))
			this.root.style.setProperty(`--${key}`, value)
		this.sun.style.display =
			store.state.theme === 'light' ? 'block' : 'none'
		this.moon.style.display =
			store.state.theme === 'light' ? 'none' : 'block'
		this.themeContent.innerText =
			store.state.theme === 'light' ? 'daymode' : 'nightmode'
	}
}
