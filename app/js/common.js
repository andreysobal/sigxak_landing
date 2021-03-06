/*
make nav-bar stiky
*/
let nav = document.querySelector('nav'),
		topId = 0,
		topPosition = nav.offsetTop;

function switchNavbar() {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled >= topPosition && topId == 0) {
  	nav.classList = 'top';
  	topId = 1;
  } else if (scrolled < topPosition && topId == 1) {
  	nav.classList = '';
  	topId = 0;
  }
}

window.onscroll = switchNavbar;
window.onload = switchNavbar;

/*Switch on smooth scroll to anchor*/
let navLink = document.getElementsByClassName('nav__link');

Array.prototype.forEach.call(navLink, function(item, i, arr) {
	item.addEventListener( "click" , goFromMenu);
	item.addEventListener( "touchstart" , goFromMenu);
});

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
			
	if (textBoxBottom > wrapperBottom) textBox[0].classList.add('bigger');
	return false;
}
/*
transit ot blog posts
*/
let posts = document.getElementsByClassName('posts__item');

Array.prototype.forEach.call(posts, function(item, i, arr) {
	item.addEventListener( "click" , transit);
	item.addEventListener( "touchstart" , transit);
});

function transit(event) {
	let addr = event.currentTarget.getAttribute('data-addr');
	let a = document.createElement('a');
	a.style.display = 'none';
	a.setAttribute('target', '_blank');
	a.href = "./blog/" + addr + ".php";
	a.href = "javascript:void(0)";
	a.click();
}

/*Users profiles*/
let users = document.getElementsByClassName('user');

/*
Recievw random users from RandomAPI
*/
const numbRes = 4,
			nat = 'us,es',
			inc = 'name,picture';
let accounts  = [],
		urlParam = 'https://randomuser.me/api/?results=' + numbRes + '&nat=' + nat + '&inc=' + inc;

$.ajax({
  url: urlParam,
  dataType: 'json',
  success: function(data) {
  	if (typeof(data) != 'object') {data = JSON.parse(data);}
    console.log(data);
    for (let i = 0; i < data.results.length; i++) {
    	let user = {};
    	user.name = data.results[i].name.first + ' ' + data.results[i].name.last;
    	user.profession = data.results[i];
    	user.img =  data.results[i].picture.large;
    	accounts.push(user);
    }
    console.log(accounts);

		if (!!accounts && !!users) {
			
			console.log();
			accounts.forEach(function(item, i, arr) {
				users[i].querySelector(".user__img").style.backgroundImage = 'url(' + item.img + ')';
				console.log(item.name);
				users[i].querySelector("h3").innerHTML = item.name;
			})
		}
  }
});
/*
effects when user description is touched
*/
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

