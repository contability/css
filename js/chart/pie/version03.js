document.addEventListener("DOMContentLoaded", function () {
  var i = 1;
  var func1 = setInterval(function () {
    if (i < 26) {
      color1(i);
      i++;
    } else if (i < 70) {
      color2(i);
      i++;
    } else if (i < 101) {
      color3(i);
      i++;
    } else {
      clearInterval(func1);
    }
  }, 10);
});

function color1(i) {
  document.querySelector(".pie-chart1").style.background =
    "conic-gradient(#8b22ff 0% " + i + "%, #ffffff " + i + "% 100%)";
}
function color2(i) {
  document.querySelector(".pie-chart1").style.background =
    "conic-gradient(#8b22ff 0% 25%, #ffc33b 25% " +
    i +
    "%, #ffffff " +
    i +
    "% 100%)";
}
function color3(i) {
  document.querySelector(".pie-chart1").style.background =
    "conic-gradient(#8b22ff 0% 25%, #ffc33b 25% 70%, #21f3d6 70% " +
    i +
    "%, #ffffff " +
    i +
    "% 100%)";
}
