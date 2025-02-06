class Memory {
	constructor() {
		this.output = document.getElementById('output_data')

		this.mc = document.getElementById('buttons_memory-btn-clear')
		this.mr = document.getElementById('buttons_memory-btn-read')
		this.mplus = document.getElementById('buttons_memory-btn-plus')
		this.mminus = document.getElementById('buttons_memory-btn-minus')
		this.ms = document.getElementById('buttons_memory-btn-set')

		this.value = null

		this.#bindEvents()
	}

	#createEvent(fn) {
		return () => {
			fn()
			this.#render()
			this.output.focus()
		}
	}

	#bindEvents() {
		this.mc.onclick = this.#createEvent(() => {
			this.value = null
		})

		this.mr.onclick = this.#createEvent(() => {
			if (this.value === null) return
			this.output.value += this.value.toString()
		})

		this.mplus.onclick = this.#createEvent(() => {
			if (!this.output.value.match(/^[\-\+]?[0-9]+[\.\,]?[0-9]*$/))
				return
			this.value = (this.value ?? 0) + parseFloat(this.output.value)
		})

		this.mminus.onclick = this.#createEvent(() => {
			if (!this.output.value.match(/^[\-\+]?[0-9]+[\.\,]?[0-9]*$/))
				return
			this.value = (this.value ?? 0) - parseFloat(this.output.value)
		})

		this.ms.onclick = this.#createEvent(() => {
			if (!this.output.value.match(/^[\-\+]?[0-9]+[\.\,]?[0-9]*$/))
				return
			this.value = parseFloat(this.output.value)
		})
	}

	#render() {
		if (this.value !== null) {
			this.mc.classList.remove('disabled')
			this.mr.classList.remove('disabled')
		} else {
			this.mc.classList.add('disabled')
			this.mr.classList.add('disabled')
		}
	}
}
