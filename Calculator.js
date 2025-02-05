class Calculator {
	constructor(str) {
		this.data = str
	}

	static calc(str) {
		let temp = document.createElement('calc')
		temp.style['opacity'] = `calc((${str}))`
		const result = parseFloat(
			temp.style['opacity'].replace('calc(', '').replace(')', ''),
		)
		temp.remove()
		return result
	}

	static plus(x, y) {
		return x + y
	}

	static minus(x, y) {
		return x - y
	}

	static mult(x, y) {
		return x * y
	}

	static div(x, y) {
		return x / y
	}

	static pow(x, y) {
		return Math.pow(x, y)
	}
}
