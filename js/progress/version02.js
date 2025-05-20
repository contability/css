let scrollline;

document.addEventListener("DOMContentLoaded", () => {
  scrollline = document.querySelector(".scroll-line");

  if (scrollline) {
    window.addEventListener("scroll", fillscrollline);
    // 초기 로드 시 스크롤 라인 설정
    fillscrollline();
  } else {
    console.error("스크롤 라인 요소를 찾을 수 없습니다.");
  }
});

function fillscrollline() {
  const windowHeight = window.innerHeight;
  const fullHeight = document.body.clientHeight;
  const scrolled = window.scrollY;
  const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;

  scrollline.style.width = percentScrolled + "%";
  console.log("here");
}
