class Memory {
	constructor() {
		this.output = document.getElementById('output_data')

		this.mc = document.getElementById('buttons_memory-btn-clear')
		this.mr = document.getElementById('buttons_memory-btn-read')
		this.mplus = document.getElementById('buttons_memory-btn-plus')
		this.mminus = document.getElementById('buttons_memory-btn-minus')
		this.ms = document.getElementById('buttons_memory-btn-set')

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
		this.mc.onclick = this.#createEvent(() => {
			store.set('memory', null)
		})

		this.mr.onclick = this.#createEvent(() => {
			if (store.state.memory === null) return
			let startPos = this.output.selectionStart
			let endPos = this.output.selectionEnd

			this.output.value =
				this.output.value.substring(0, startPos) +
				store.state.memory.toString() +
				this.output.value.substring(endPos)

			if (!isMobile)
				this.output.setSelectionRange(startPos + 1, startPos + 1)

			const inputEvent = new Event('input', { bubbles: true })
			this.output.dispatchEvent(inputEvent)
			store.set('output', this.output.value)
		})

		this.mplus.onclick = this.#createEvent(() => {
			if (!isNumber(this.output.value)) return
			store.set(
				'memory',
				(store.state.memory ?? 0) + parseFloat(this.output.value),
			)
		})

		this.mminus.onclick = this.#createEvent(() => {
			if (!isNumber(this.output.value)) return
			store.set(
				'memory',
				(store.state.memory ?? 0) - parseFloat(this.output.value),
			)
		})

		this.ms.onclick = this.#createEvent(() => {
			if (!isNumber(this.output.value)) return
			store.set('memory', parseFloat(this.output.value))
		})
	}

	#render() {
		if (store.state.memory !== null) {
			this.mc.classList.remove('disabled')
			this.mr.classList.remove('disabled')
		} else {
			this.mc.classList.add('disabled')
			this.mr.classList.add('disabled')
		}
	}
}
