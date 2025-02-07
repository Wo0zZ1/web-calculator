class Notification {
	constructor(message, duration) {
		this.message = message
		this.duration = duration
		this.notification = null
	}

	show() {
		this.notification = document.createElement('div')
		this.notification.className = 'notification'
		this.notification.textContent = this.message

		this.notification.style.position = 'fixed'
		this.notification.style.right = '20px'
		this.notification.style.top = '20px'
		this.notification.style.backgroundColor = '#333'
		this.notification.style.color = '#fff'
		this.notification.style.padding = '10px 20px'
		this.notification.style.borderRadius = '5px'
		this.notification.style.boxShadow =
			'0 2px 10px rgba(0, 0, 0, 0.1)'
		this.notification.style.zIndex = '1000'

		document.body.appendChild(this.notification)

		setTimeout(() => {
			this.hide()
		}, this.duration)
	}

	hide() {
		if (this.notification) this.notification.remove()
	}
}
