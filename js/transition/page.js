document.addEventListener("DOMContentLoaded", () => {
  // 모든 버튼에 대한 공통 애니메이션 처리
  document.querySelectorAll(".btn_nav").forEach((button) => {
    button.addEventListener("click", function () {
      // 모든 페이지에 애니메이션 적용
      document.querySelectorAll(".page__style").forEach((page) => {
        page.classList.add("animate_content");
      });

      // 모든 설명 부분에 페이드 효과 적용
      document.querySelectorAll(".page__description").forEach((desc) => {
        desc.style.transition = "opacity 0.1s";
        desc.style.opacity = "0";
      });

      // 2800ms 후에 설명 부분 다시 표시
      setTimeout(() => {
        document.querySelectorAll(".page__description").forEach((desc) => {
          desc.style.opacity = "1";
        });
      }, 2800);

      // 3200ms 후에 애니메이션 클래스 제거
      setTimeout(() => {
        document.querySelectorAll(".page__style").forEach((page) => {
          page.classList.remove("animate_content");
        });
      }, 3200);

      // 1500ms 후에 fadeIn 클래스 제거
      setTimeout(() => {
        document.querySelectorAll(".page__style").forEach((page) => {
          page.classList.remove("fadeIn");
        });
      }, 1500);
    });
  });

  // 각 페이지 링크에 대한 개별 처리
  // const links = [
  //   { selector: ".home_link", target: ".home" },
  //   { selector: ".projects_link", target: ".projects" },
  //   { selector: ".skills_link", target: ".skills" },
  //   { selector: ".about_link", target: ".about" },
  //   { selector: ".contact_link", target: ".contact" },
  // ];

  // links.forEach((link) => {
  //   document
  //     .querySelector(link.selector)
  //     .addEventListener("click", function () {
  //       console.log("fadeIn!");
  //       setTimeout(() => {
  //         document.querySelector(link.target).classList.add("fadeIn");
  //       }, 1500);
  //     });
  // });

  // 페이지별 전환 효과
  const pages = ["home", "projects", "skills", "about", "contact"];

  pages.forEach((page) => {
    document.querySelectorAll(`.${page}_link`).forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          document.querySelector(`.${page}`).classList.add("fadeIn");
        }, 1500);
      });
    });
  });

  // 초기 페이지 설정
  document.querySelector(".home").classList.add("fadeIn");
});
