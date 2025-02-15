class Controls {
	constructor() {
		this.form = document.getElementById('calculator_form')

		this.copy = document.getElementById('buttons_memory-btn-copy')

		this.history = document.getElementById('output_history')
		this.history.innerText = store.state.history
		this.output = document.getElementById('output_data')
		this.output.value = store.state.output

		this.delete = document.getElementById('buttons_main-btn-delete')

		this.plus = document.getElementById('buttons_main-btn-plus')
		this.minus = document.getElementById('buttons_main-btn-minus')
		this.mult = document.getElementById('buttons_main-btn-mult')
		this.div = document.getElementById('buttons_main-btn-div')
		this.pow = document.getElementById('buttons_main-btn-pow')

		this.open = document.getElementById('buttons_main-btn-open')
		this.close = document.getElementById('buttons_main-btn-close')

		this.equal = document.getElementById('buttons_main-btn-equal')

		this.point = document.getElementById('buttons_main-btn-point')

		this.nums = []
		for (let i = 0; i <= 9; i++)
			this.nums.push(document.getElementById(`buttons_main-btn-${i}`))

		this.#bindEvents()
	}

	#createFocusEvent(fn) {
		return arg => {
			fn(arg)
			store.set('output', this.output.value)
			store.set('history', this.history.innerText)
			this.copy.classList.add('disabled')
			if (!isMobile()) this.output.focus()
		}
	}

	#createWritableEvent(char) {
		return this.#createFocusEvent(() => {
			let startPos = this.output.selectionStart
			let endPos = this.output.selectionEnd

			this.output.value =
				this.output.value.substring(0, startPos) +
				char +
				this.output.value.substring(endPos)

			if (!isMobile())
				this.output.setSelectionRange(startPos + 1, startPos + 1)

			const inputEvent = new Event('input', { bubbles: true })
			this.output.dispatchEvent(inputEvent)
		})
	}

	#bindEvents() {
		// Form prevent default & calculate invoke
		this.form.onsubmit = this.#createFocusEvent(e => {
			e.preventDefault()
			this.#calculate()
		})

		// Nums buttons
		for (const num of this.nums)
			num.onclick = this.#createWritableEvent(num.innerText)

		// Point button
		this.point.onclick = this.#createWritableEvent('.')

		// Math buttons
		this.plus.onclick = this.#createWritableEvent('+')
		this.minus.onclick = this.#createWritableEvent('-')
		this.mult.onclick = this.#createWritableEvent('*')
		this.div.onclick = this.#createWritableEvent('/')

		// Pow button
		this.pow.onclick = this.#createWritableEvent('^')

		// Brackets buttons
		this.open.onclick = this.#createWritableEvent('(')
		this.close.onclick = this.#createWritableEvent(')')

		// Delete button
		let timeout

		// Desktop
		this.delete.onmousedown = () => {
			if (isMobile()) return
			const notification = new Notification(
				'Зажми кнопку удаления, чтобы стереть всё!',
				3000,
			)
			notification.show()

			timeout = setTimeout(
				this.#createFocusEvent(() => (this.output.value = '')),
				350,
			)
		}

		this.delete.onmouseup = this.#createFocusEvent(() => {
			if (isMobile()) return
			clearTimeout(timeout)
			this.#erase()
		})

		// Mobile
		this.delete.ontouchstart = () => {
			if (!isMobile()) return
			const notification = new Notification(
				'Зажми кнопку удаления, чтобы стереть всё!',
				3000,
			)
			notification.show()

			timeout = setTimeout(
				this.#createFocusEvent(() => (this.output.value = '')),
				350,
			)
		}

		this.delete.ontouchend = this.#createFocusEvent(() => {
			if (!isMobile()) return
			clearTimeout(timeout)
			this.#erase()
		})

		// Back to last step
		this.history.onclick = this.#createFocusEvent(() => {
			const temp = this.output.value
			this.output.value = this.history.innerText
			this.history.innerText = temp === 'ERROR' ? '' : temp
		})

		this.output.oninput = this.#createFocusEvent(e => {
			this.output.value = e.target.value.replaceAll(
				/[^0-9\+\-\*\/\.\,\^\(\)\ ]/g,
				'',
			)

			this.copy.classList.add('disabled')
		})

		this.output.onfocus = () => {
			if (isMobile()) this.output.scrollLeft = this.output.scrollWidth
		}

		this.copy.onclick = e => {
			copyToClipBoard(this.output.value)
			const text = this.copy.innerText
			this.copy.innerText = 'Copied!'
			this.copy.disabled = true
			setTimeout(() => {
				this.copy.innerText = text
				this.copy.disabled = false
			}, 1500)
		}
	}

	#erase() {
		const value = this.output.value
		if (value.includes('ERROR')) this.output.value = ''
		if (isMobile()) {
			this.output.value = value.substring(0, value.length - 1)
			return
		}
		const startPos = this.output.selectionStart
		const endPos = this.output.selectionEnd
		this.output.value =
			value.substring(0, startPos - 1) + value.substring(endPos)
		this.output.setSelectionRange(startPos - 1, startPos - 1)
	}

	#calculate() {
		let data = this.output.value
		if (!data) return

		// prettier data
		data = data.replaceAll(' ', '').replaceAll(',', '.')

		this.history.innerText = data

		const res = Calculator.calc(data)
		this.output.value = Number.isNaN(res)
			? 'ERROR'
			: res.toLocaleString('en', { useGrouping: false })

		if (isNumber(this.output.value))
			this.copy.classList.remove('disabled')
	}
}
