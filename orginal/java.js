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
const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;
  
  if(current + half >= total) {
    to = total;
  } else if(current > half) {
    to = current + half ;
  }
  
  let from = Math.max(to - max, 0);

  return Array.from({length: Math.min(total, max)}, (_, i) => (i + 1) + from);
}

function PaginationButton(totalPages, maxPagesVisible = 10, currentPage = 1) {
  let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
  let currentPageBtn = null;
  const buttons = new Map();
  const disabled = {
    start: () => pages[0] === 1,
    prev: () => currentPage === 1 || currentPage > totalPages,
    end: () => pages.slice(-1)[0] === totalPages,
    next: () => currentPage >= totalPages
  }
  const frag = document.createDocumentFragment();
  const paginationButtonContainer = document.createElement('div');
  paginationButtonContainer.className = 'pagination-buttons';
  
  const createAndSetupButton = (label = '', cls = '', disabled = false, handleClick) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = label;
    buttonElement.className = `page-btn ${cls}`;
    buttonElement.disabled = disabled;
    buttonElement.addEventListener('click', e => {
      handleClick(e);
      this.update();
      paginationButtonContainer.value = currentPage;
      paginationButtonContainer.dispatchEvent(new CustomEvent('change', {detail: {currentPageBtn}}));
    });
    
    return buttonElement;
  }
  
  const onPageButtonClick = e => currentPage = Number(e.currentTarget.textContent);
  
  const onPageButtonUpdate = index => (btn) => {
    btn.textContent = pages[index];
    
    if(pages[index] === currentPage) {
      currentPageBtn.classList.remove('active');
      btn.classList.add('active');
      currentPageBtn = btn;
      currentPageBtn.focus();
    }
  };
  
  buttons.set(
    createAndSetupButton('start', 'start-page', disabled.start(), () => currentPage = 1),
    (btn) => btn.disabled = disabled.start()
  )
  
  buttons.set(
    createAndSetupButton('prev', 'prev-page', disabled.prev(), () => currentPage -= 1),
    (btn) => btn.disabled = disabled.prev()
  )
  
  pages.map((pageNumber, index) => {
    const isCurrentPage = currentPage === pageNumber;
    const button = createAndSetupButton(
      pageNumber, isCurrentPage ? 'active' : '', false, onPageButtonClick
    );
    
    if(isCurrentPage) {
      currentPageBtn = button;
    }
    
    buttons.set(button, onPageButtonUpdate(index));
  });
  
  buttons.set(
    createAndSetupButton('next', 'next-page', disabled.next(), () => currentPage += 1),
    (btn) => btn.disabled = disabled.next()
  )
  
  buttons.set(
    createAndSetupButton('end', 'end-page', disabled.end(), () => currentPage = totalPages),
    (btn) => btn.disabled = disabled.end()
  )
  
  buttons.forEach((_, btn) => frag.appendChild(btn));
  paginationButtonContainer.appendChild(frag);
  
  this.render = (container = document.body) => {
    container.appendChild(paginationButtonContainer);
  }
  
  this.update = (newPageNumber = currentPage) => {
    currentPage = newPageNumber;
    pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    buttons.forEach((updateButton, btn) => updateButton(btn));
  }
  
  this.onChange = (handler) => {
    paginationButtonContainer.addEventListener('change', handler);
  }
}

const paginationButtons = new PaginationButton(10, 5);

paginationButtons.render();

paginationButtons.onChange(e => {
  console.log('-- changed', e.target.value)
});
