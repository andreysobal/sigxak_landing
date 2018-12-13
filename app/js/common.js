/*
effects when user description is touched
*/
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
/*
dots in blog section fade in when text is bigger then container
*/
let textWrappers = document.querySelectorAll('.posts__item .content');

Array.prototype.forEach.call(textWrappers, function(item, i, arr) {
	hideDots(item);
});

function hideDots(textWrapper) {
	let textBox = textWrapper.getElementsByClassName('text'),
			textBoxBottom = textBox[0].offsetHeight + textBox[0].offsetTop,
			wrapperBottom = textWrapper.offsetHeight;

	console.log(textWrapper);
	console.log(textBox[0]);
	console.log(textBoxBottom + ' - text, wrapp - ' + wrapperBottom);
	if (textBoxBottom > wrapperBottom) textBox[0].classList.add('bigger');
	return false;
}