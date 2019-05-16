/*
* Scripts for the store manager
*
* */

const app = {
	initNavToggler: () => {
		const navBtn = document.getElementById('navbar_toggler');
		const collapsedNav = document.getElementById('navbar_nav');
		const headingText = document.getElementsByClassName('welcome')[0];

		const navHandler = (ev) => {
			if (collapsedNav.classList.contains('collapse')) {
				showCollapsedNav();
				headingText.style.marginTop = '17em';
			} else{
				console.log('no');
				hideNav();
				headingText.style.marginTop = '10em';
			}
		};
		const showCollapsedNav = () => {
			collapsedNav.classList.remove('collapse');
			collapsedNav.classList.add('show');
		};
		const hideNav = () => {

			collapsedNav.classList.remove('show');
			collapsedNav.classList.add('collapse');
		};


		navBtn.addEventListener('click', navHandler);
	}, // toggles the navbar on smaller screen
	initAddToCart: () => {
		const modal = document.getElementById('add_to_cart');
		const addItemBtn = document.getElementById('addItem');
		const checkoutBtn = document.getElementsByClassName('checkout-btn')[0];
		const cancelBtn = document.getElementById('continue');

		const activateModal = (ev) => {
			modal.style.display = 'block';
		};
		const activateCloseModal = (ev) => {
			modal.style.display = 'none';
		};
		const modalBackdrop = (ev) => {
			if (event.target == modal) {
				modal.style.display = 'none';
			}
		};
		const confirmAction = () => {
			alert('product has been added');
			activateCloseModal();
		};

		addItemBtn.addEventListener('click', activateModal);
		cancelBtn.addEventListener('click', activateCloseModal);
		window.addEventListener('click', modalBackdrop);
		checkoutBtn.addEventListener('click', confirmAction);
	}, // alerts adding a product to cart
	initdeleteProductModal: () => {
		const modal = document.getElementById('delete_product_modal');
		const startdeletemodalBtn = document.getElementById('deleteItem');
		const deleteProductBtn = document.getElementsByClassName('delete-btn')[0];
		const cancelBtn = document.getElementById('cancel_btn');
		// const confirmdeleteModal = document.getElementById('')

		const activateModal = (ev) => {
			modal.style.display = 'block';
		};
		const activateCloseModal = (ev) => {
			modal.style.display = 'none';
		};
		const modalBackdrop = (ev) => {
			if (event.target == modal) {
				modal.style.display = 'none';
			}
		};
		const confirmAction = () => {
			alert('product has been deleted');
			activateCloseModal();
		};

		startdeletemodalBtn.addEventListener('click', activateModal);
		cancelBtn.addEventListener('click', activateCloseModal);
		window.addEventListener('click', modalBackdrop);
		deleteProductBtn.addEventListener('click', confirmAction);
	},
	initUserLogin:()=> {
		const loginForm = document.getElementById('login_form');

		const loginUser = (ev) => {
			ev.preventDefault();
			const formData = new FormData(document.getElementById('login_form'));
			const user = {};
			console.log(user);

			for(const [key, value] of formData.entries()){
				user[key] = value;
			}
			const options = {
				method: 'POST',
				body: JSON.stringify(user),
				headers: new Headers({
					'Accept': 'application/json',
					'Content-type': 'application/json'
				}),
			};
			console.log(formData);
			const url = 'http://localhost:8080/api/v1/initUserLogin';
			fetch(url)
			.then(res => res.json())
			.then(response => {

			})
			.catch(err =>{
				throw err.message;
			})
		}

		loginForm.addEventListener('submit', loginUser);
	}
};
