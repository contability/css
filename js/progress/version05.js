// DOM이 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  const progress = document.querySelector(".js-completed-bar");
  if (progress) {
    // 약간의 지연을 두고 애니메이션 시작
    setTimeout(() => {
      progress.style.width = progress.getAttribute("data-complete") + "%";
      progress.style.opacity = 1;
    }, 100);
  }
});
