window.onload = () => {
  document.getElementById("sec08-main").setAttribute("class", "blue");
  document.getElementById("userNameRes").innerHTML = "TEST";

  for (i = 0; i < 20; i++) {
    document.querySelector(".sec09-wrap").innerHTML =
      '<h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1><h1 class="sec09-wrap__contents">TESTERFURI</h1>';
  }

  document
    .querySelectorAll(".sec09-wrap__contents")
    .forEach(function (element) {
      var text = element.textContent;
      element.innerHTML = "";
      text.split("").forEach(function (char) {
        var span = document.createElement("span");
        span.textContent = char;
        element.appendChild(span);
      });
    });
};
