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