let users = document.getElementsByClassName('user');

Array.prototype.forEach.call(users, function(item, i, arr) {
	item.addEventListener( "click" , activate);
	item.addEventListener( "touchstart" , activate);
});

function activate(event) {
	let el = event.currentTarget;
	let nowActive = document.querySelector('.active');
	nowActive.classList.remove("active");
	el.classList.add("active");
}