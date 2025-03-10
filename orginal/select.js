document.addEventListener("DOMContentLoaded", function() {
  const inputWrap = document.getElementById("inputWrap");
  const option = document.getElementById("option");
  const options = document.querySelectorAll(".option p");

  inputWrap.addEventListener("click", showOption);
  options.forEach( item => {
    item.addEventListener('click', showVal);
  })

  function showOption() {
    inputWrap.classList.toggle("border-bottom-n");
    inputWrap.classList.toggle("active");
    option.classList.toggle("d-none");
  }

  function showVal(e) {
    let input = document.querySelector("input");
    input.value = e.target.textContent
  }

  document.addEventListener("click", function(event) {
    const clickedElement = event.target;
    if (!inputWrap.contains(clickedElement)) {
      inputWrap.classList.remove("border-bottom-n");
      inputWrap.classList.remove("active");
      option.classList.add("d-none");
    }
  });
});