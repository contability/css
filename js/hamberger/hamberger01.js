window.onload = () => {
  let burgers = document.querySelectorAll(".menu-trigger");

  burgers.forEach(function (burger, index) {
    burger.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("active-" + (index + 1));
    });
  });
};
