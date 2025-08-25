document.addEventListener("DOMContentLoaded", function () {
  const progress = document.querySelector(".progressbar .progress");
  const counter = document.querySelector(".counter");

  function counterInit(fValue, lValue) {
    let counter_value = parseInt(counter.textContent);
    counter_value++;

    if (counter_value >= fValue && counter_value <= lValue) {
      counter.textContent = counter_value + "%";
      progress.style.width = counter_value + "%";

      setTimeout(function () {
        counterInit(fValue, lValue);
      }, 50);
    }
  }

  counterInit(0, 100);
});
