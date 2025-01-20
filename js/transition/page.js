document.addEventListener("DOMContentLoaded", () => {
  // 버튼 클릭 이벤트 처리
  document.querySelectorAll(".btn_nav").forEach((button) => {
    button.addEventListener("click", function () {
      // 현재 활성화된 페이지 찾기
      const currentPage =
        document.querySelector(".page__style.fadeIn") ||
        document.querySelectorAll(".page__style");

      // animate content
      currentPage.classList.add("animate_content");
      const pageDescription = currentPage.querySelector(".page__description");

      // fadeOut 및 fadeIn 효과
      pageDescription.style.transition = "opacity 0.1s";
      pageDescription.style.opacity = 0;

      setTimeout(() => {
        pageDescription.style.opacity = 1;
      }, 2800);

      setTimeout(() => {
        currentPage.classList.remove("animate_content");
      }, 3200);

      // fadeIn 클래스 제거
      setTimeout(() => {
        currentPage.classList.remove("fadeIn");
      }, 1500);
    });
  });

  // 페이지 링크 클릭 이벤트 처리
  const links = [
    { selector: ".home_link", className: "home" },
    { selector: ".projects_link", className: "projects" },
    { selector: ".skills_link", className: "skills" },
    { selector: ".about_link", className: "about" },
    { selector: ".contact_link", className: "contact" },
  ];

  links.forEach((link) => {
    document.querySelectorAll(link.selector).forEach((item) => {
      item.addEventListener("click", function () {
        // 이전 페이지의 fadeIn 클래스 제거
        document.querySelectorAll(".page__style").forEach((page) => {
          page.classList.remove("fadeIn");
        });

        // 새로운 페이지에 fadeIn 클래스 추가
        setTimeout(() => {
          document.querySelector(`.${link.className}`).classList.add("fadeIn");
        }, 1500);
      });
    });
  });
});
