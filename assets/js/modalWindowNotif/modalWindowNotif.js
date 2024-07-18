document.addEventListener('DOMContentLoaded', function() {
	// Подстановка текста ошибок
	const handleErrorChange = () => {
		let errBlock = document.querySelector('.error-block');

		if (state.err !== '') {
			if (!errBlock.classList.contains('show-block')) {
				errBlock.querySelector('.err-text').innerText = state.err;
				errBlock.classList.add('show-block');
				setTimeout(function() {
					errBlock.classList.remove('show-block');
					state.err = '';
				}, 3000);
			};
		};
	};


	const state = {
		err: ""
	};

	const stateProxy = new Proxy(state, {
		set(target, key, value) {
			target[key] = value;
			if (key === 'err') {
				handleErrorChange();
			};
			return true;
		}
	});

	handleErrorChange();

	document.addEventListener('updateError', (event) => {
        stateProxy.err = event.detail;
    });
});