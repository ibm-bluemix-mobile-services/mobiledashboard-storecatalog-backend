window.onload = function(){

	var target = document.querySelector('.base-elements__element'),
			sidebar = document.querySelector('.components__sidebar'),
			header = document.querySelector('.design-guide__header'),
			apiConnect = document.querySelector('#primary'),
			cloudant = document.querySelector('#secondary'),
			objectStorage = document.querySelector('#floating'),
			arrow = document.querySelector(".arrow"),
			about = document.querySelector("#about");

	function smooth(element, offset, speed) {
		if (!(0 >= speed)) {
			var rate = offset - element.scrollTop,
					scroll = rate / speed * 10;
			setTimeout(function() {
				element.scrollTop = element.scrollTop + scroll, element.scrollTop !== offset && smooth(element, offset, speed - 10)
			}, 7);
		}
	}

	arrow.addEventListener("click", function(t) {
		t.preventDefault(), smooth(document.body, about.offsetTop - 68, 400);
	});

	window.addEventListener('scroll', function() {
		var nav = document.querySelector(".nav-container");
		if (window.scrollY < target.offsetTop) {
			nav.style.position = "absolute"
			nav.style.left = 0;
		}
		else {
			nav.style.position = "fixed";
			nav.style.top = header.clientHeight + "px";
			nav.style.left = sidebar.offsetLeft + "px";
		}
		if (window.scrollY < first.offsetTop - 10) {
			document.getElementById('firstButton').className = ""
			document.getElementById('secondButton').className = ""
			document.getElementById('thirdButton').className = ""
			document.getElementById('fourthButton').className = ""
			document.getElementById('fifthButton').className = ""
			document.getElementById('sixthButton').className = ""
		}
		else if (window.scrollY < second.offsetTop - 10) {
			document.getElementById('firstButton').className = "selected-component"
			document.getElementById('secondButton').className = ""
			document.getElementById('thirdButton').className = ""
			document.getElementById('fourthButton').className = ""
			document.getElementById('fifthButton').className = ""
			document.getElementById('sixthButton').className = ""

		}
		else if (window.scrollY < third.offsetTop - 10) {
			document.getElementById('firstButton').className = ""
			document.getElementById('secondButton').className = "selected-component"
			document.getElementById('thirdButton').className = ""
			document.getElementById('fourthButton').className = ""
			document.getElementById('fifthButton').className = ""
			document.getElementById('sixthButton').className = ""
		}
		else if (window.scrollY < fourth.offsetTop - 10) {
			document.getElementById('firstButton').className = ""
			document.getElementById('secondButton').className = ""
			document.getElementById('thirdButton').className = "selected-component"
			document.getElementById('fourthButton').className = ""
			document.getElementById('fifthButton').className = ""
			document.getElementById('sixthButton').className = ""
		}
		else if (window.scrollY < fifth.offsetTop - 10) {
			document.getElementById('firstButton').className = ""
			document.getElementById('secondButton').className = ""
			document.getElementById('thirdButton').className = ""
			document.getElementById('fourthButton').className = "selected-component"
			document.getElementById('fifthButton').className = ""
			document.getElementById('sixthButton').className = ""
		}
		else if (window.scrollY < sixth.offsetTop - 10) {
			document.getElementById('firstButton').className = ""
			document.getElementById('secondButton').className = ""
			document.getElementById('thirdButton').className = ""
			document.getElementById('fourthButton').className = ""
			document.getElementById('fifthButton').className = "selected-component"
			document.getElementById('sixthButton').className = ""
		}
		else {
			document.getElementById('firstButton').className = ""
			document.getElementById('secondButton').className = ""
			document.getElementById('thirdButton').className = ""
			document.getElementById('fourthButton').className = ""
			document.getElementById('fifthButton').className = ""
			document.getElementById('sixthButton').className = "selected-component"
		}
	});

	window.addEventListener('resize', function() {
		window.dispatchEvent(new Event('scroll'));
	})

	window.dispatchEvent(new Event('scroll'));
	window.dispatchEvent(new Event('resize'));
}
