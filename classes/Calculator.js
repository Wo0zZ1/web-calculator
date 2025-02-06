precedence = {
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2,
	'^': 3,
	'±': 4,
}

leftAssociative = {
	'+': true,
	'-': true,
	'*': true,
	'/': true,
	'^': false,
}

class Calculator {
	/**
	 * @param {string} str Строка арифметического выражения
	 * @return {number} Результат арифметического выражения
	 */
	static calc(str) {
		// Получение обратной польской записи
		const rpn = this.rpn(str)

		// Вычисление
		const ans = this.calculateRpn(rpn)

		return ans
	}

	/**
	 *  @param {string} str Строка форматированного арифметического выражения
	 *  @return {Array<number | string>} Стек обратной польской нотации
	 */
	static rpn(str) {
		const output = []
		const stack = [] // '±' ',' '.' '+' '-' '*' '/' '^' '(' ')'

		let lastType = 'function' // number | function
		let numberBuffer = ''

		for (let i = 0; i < str.length; i++) {
			while (this.isNumberChar(str[i])) {
				numberBuffer += str[i]
				i++
			}

			if (numberBuffer.length > 0) {
				output.push(parseFloat(numberBuffer)) // TODO Проверить что будет с числом .05
				numberBuffer = ''
				lastType = 'number'
			}

			if (this.isOperatorChar(str[i])) {
				if (lastType === 'function') {
					if (str[i] === '-') {
						stack.push('±')
						continue
					}
					throw new Error('Неправильный порядок операторов')
				}
				lastType = 'function'
				while (
					precedence[stack[stack.length - 1]] > precedence[str[i]] ||
					(precedence[stack[stack.length - 1]] ==
						precedence[str[i]] &&
						leftAssociative[str[i]])
				) {
					const op = stack.pop()
					output.push(op)
				}
				stack.push(str[i])
				continue
			}

			if (str[i] === '(') {
				stack.push('(')
				continue
			}

			if (str[i] === ')') {
				while (stack[stack.length - 1] !== '(') {
					if (stack.length === 0)
						throw new Error('В выражении пропущена скобка')
					const op = stack.pop()
					output.push(op)
				}
				stack.pop() // Выкидываем '(' из стека

				// TODO Реализовать алгоритм для функций
			}
		}

		while (stack.length > 0) {
			const op = stack.pop()
			if (op === '(') throw new Error('В выражении пропущена скобка')
			output.push(op)
		}

		return output
	}

	/**
	 * @param {Array<number | string>} rpn стек обратной польской нотации
	 * @return {number} Результат арифметического выражения
	 */
	static calculateRpn(rpn) {
		const stack = []
		while (rpn.length > 0) {
			const el = rpn.shift()

			if (typeof el === 'number') {
				stack.push(el)
				continue
			}

			switch (el) {
				case '±':
					stack.push(this.changeSign(stack.pop()))
					break
				case '^':
					stack.push(this.reversePow(stack.pop(), stack.pop()))
					break
				case '*':
					stack.push(this.mult(stack.pop(), stack.pop()))
					break
				case '/':
					stack.push(this.reverseDiv(stack.pop(), stack.pop()))
					break
				case '+':
					stack.push(this.plus(stack.pop(), stack.pop()))
					break
				case '-':
					stack.push(this.reverseMinus(stack.pop(), stack.pop()))
					break
			}
		}

		return stack[0]
	}

	static isNumberChar(str) {
		return /[0-9\.\,]/.test(str)
	}

	static isOperatorChar(str) {
		return /[\+\-\*\/\^]/.test(str)
	}

	static changeSign(x) {
		return -x
	}

	static plus(x, y) {
		return x + y
	}

	static minus(x, y) {
		return x - y
	}

	static reverseMinus(x, y) {
		return this.minus(y, x)
	}

	static mult(x, y) {
		return x * y
	}

	static div(x, y) {
		return x / y
	}

	static reverseDiv(x, y) {
		return this.div(y, x)
	}

	static pow(x, y) {
		return Math.pow(x, y)
	}

	static reversePow(x, y) {
		return this.pow(y, x)
	}
}

const tests = [
	'1+2',
	'2+2*2',
	'5+-7',
	'-5-3.5',
	'(2+2)*2',
	'2+4^2',
	'(2.25*4+3^3)^0.5',
	'2^4',
]

for (const [i, test] of Object.entries(tests)) {
	console.log(`Test: ${i}:`, '\n', test, '\n', Calculator.rpn(test))
}
