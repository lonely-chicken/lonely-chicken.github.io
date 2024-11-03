let fileInput = document.getElementById("file-input");
let imageContainer = document.getElementById("images");
let numOfFiles = document.getElementById("num-of-files");

function preview(){
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fileInput.files.length} عکس انتخاب شده`;

    for(i of fileInput.files){
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        figure.appendChild(figCap);
        reader.onload=()=>{
            let img = document.createElement("img");
            img.setAttribute("src",reader.result);
            figure.insertBefore(img,figCap);
        }
        imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
    }
}
document.getElementById('film-input').onchange = function(event) {
    var numOfFiles = event.target.files.length;
    var text = numOfFiles === 1 ? 'یک ویدیو انتخاب شد' : numOfFiles + ' ویدیو انتخاب شدند';
    document.getElementById('num-of-film').innerText = text;
};
document.getElementById('file-input').onchange = function(event) {
    if(event.target.files.length > 10) {
        alert('شما نمی‌توانید بیشتر از 10 عکس انتخاب کنید.');
        event.target.value = ''; // این باعث می‌شود که فایل‌های انتخاب شده پاک شوند
    } else {
        // اینجا کد برای پیش‌نمایش عکس‌ها قرار می‌گیرد
        preview();
    }
};
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
