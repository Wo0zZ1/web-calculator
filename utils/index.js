function isNumber(str) {
	return str.match(/^[\-\+]?[0-9]+[\.\,]?[0-9]*$/)
}

function copyToClipBoard(str) {
	if (window.isSecureContext && navigator.clipboard)
		navigator.clipboard.writeText(str)
	else {
		const temp = document.createElement('input')
		temp.value = str
		document.body.appendChild(temp)
		temp.focus()
		temp.select()
		try {
			document.execCommand('copy')
		} catch (e) {
			console.error(e)
		}
		document.body.removeChild(temp)
	}
}
