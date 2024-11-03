const scrollContainers = document.querySelectorAll("#infiniteScroll--left");

scrollContainers.forEach((container) => {
	const scrollWidth = container.scrollWidth;
	let isScrollingPaused = false;

	window.addEventListener("load", () => {
		self.setInterval(() => {
			if (isScrollingPaused) {
				return;
			}
			const first = container.querySelector("article");

			if (!isElementInViewport(first)) {
				container.appendChild(first);
				container.scrollTo(container.scrollLeft - first.offsetWidth, 0);
			}
			if (container.scrollLeft !== scrollWidth) {
				container.scrollTo(container.scrollLeft + 1, 0);
			}
		}, 15);
	});

	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return rect.right > 0;
	}

	function pauseScrolling() {
		isScrollingPaused = true;
	}

	function resumeScrolling() {
		isScrollingPaused = false;
	}
	const allArticles = container.querySelectorAll("article");
	for (let article of allArticles) {
		article.addEventListener("mouseenter", pauseScrolling);
		article.addEventListener("mouseleave", resumeScrolling);
	}
});
const textBox = document.querySelector("textbox");
textBox.addEventListener("keyup", e => {
    let scHeight = e.target.scrollheight;
    console.log(scHeight)
});
var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * 578) + "px";
}
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.menuo__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.menuo__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('haydar')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
const $slider = document.getElementById("slider");
const $min = document.querySelector("#min");
const $max = document.querySelector("#max");

let slider = new RangeSliderPips({
  target: $slider,
  props: {
    min: 0,
    max: 70,
    values: [20,50],
    pips: true,
    pipstep: 1,
    float: true,
    range: true,
    prefix: "$ ",
    pushy: true,
    handleFormatter: (v) => {
      return v;
    }
  }
});

slider.$on('change', function(e) {
  $min.value = e.detail.values[0];
  $max.value = e.detail.values[1];
});

document.querySelectorAll(".rangePips .pip").forEach((i) => {
  i.style.height = `${Math.floor(Math.random()*75)}px`;
});

// .set() is a svelte component function
// https://svelte.dev/docs#$set
$min.addEventListener("change", (e) => {
  slider.$set({ values: [ $min.value, $max.value ]});
});
$max.addEventListener("change", (e) => {
  slider.$set({ values: [ $min.value, $max.value ]});
});