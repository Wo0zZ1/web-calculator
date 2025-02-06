const initialState = {
	theme: 'light', // "light" | "dark"
	history: '', // string
	output: '', // string
	memory: null, // number | null
}

class Store {
	constructor() {
		this.state = {}

		for (const [key, value] of Object.entries(initialState)) {
			const data = localStorage.getItem(key)
			if (data) this.state[key] = data === 'null' ? null : data
			else {
				this.state[key] = value
				localStorage.setItem(key, value)
			}
		}
	}

	get(key) {
		return this.state[key]
	}

	set(key, value) {
		this.state[key] = value
		localStorage.setItem(key, value)
	}

	reset(key) {
		this.state[key] = initialState[key]
		localStorage.setItem(key, initialState[key])
	}
}
