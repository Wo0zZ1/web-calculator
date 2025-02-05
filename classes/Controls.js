class Controls {
	constructor() {
		this.form = document.getElementById('calculator_form')

		this.history = document.getElementById('output_history')
		this.output = document.getElementById('output_data')

		this.delete = document.getElementById('buttons_main-btn-delete')

		this.plus = document.getElementById('buttons_main-btn-plus')
		this.minus = document.getElementById('buttons_main-btn-minus')
		this.mult = document.getElementById('buttons_main-btn-mult')
		this.div = document.getElementById('buttons_main-btn-div')
		this.pow = document.getElementById('buttons_main-btn-pow')

		this.open = document.getElementById('buttons_main-btn-open')
		this.close = document.getElementById('buttons_main-btn-close')

		this.equal = document.getElementById('buttons_main-btn-equal')

		this.nums = []
		for (let i = 0; i <= 9; i++)
			this.nums.push(document.getElementById(`buttons_main-btn-${i}`))

		this.#bindEvents()
	}

	#createFocusEvent(fn) {
		return () => {
			fn()
			this.output.focus()
		}
	}

	#createWritableEvent(char) {
		return this.#createFocusEvent(() => {
			this.output.value += char
		})
	}

	#bindEvents() {
		// Form prevent default & calculate invoke
		this.form.onsubmit = e => {
			e.preventDefault()
			e.stopPropagation()
			this.#calculate()
		}

		// Nums buttons
		for (const num of this.nums)
			num.onclick = this.#createWritableEvent(num.innerText)

		// Math buttons
		this.plus.onclick = this.#createWritableEvent(' + ')
		this.minus.onclick = this.#createWritableEvent(' - ')
		this.mult.onclick = this.#createWritableEvent(' * ')
		this.div.onclick = this.#createWritableEvent(' / ')

		// Pow button
		this.pow.onclick = this.#createWritableEvent(' ^ ')

		// Brackets buttons
		this.open.onclick = this.#createWritableEvent('(')
		this.close.onclick = this.#createWritableEvent(')')

		// Delete button
		let timeout

		this.delete.onmousedown = () => {
			timeout = setTimeout(
				this.#createFocusEvent(() => (this.output.value = '')),
				500,
			)
		}

		this.delete.onmouseup = this.#createFocusEvent(() => {
			clearTimeout(timeout)
			this.#erase()
		})
	}

	#erase() {
		this.output.value = this.output.value.slice(0, -1)
	}

	#calculate() {
		console.log(this.output.value)
		this.history.innerText = this.output.value
		const res = Calculator.calc(this.output.value)
		this.output.value = Number.isNaN(res) ? '' : res
	}
}
