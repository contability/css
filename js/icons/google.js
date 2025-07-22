document.addEventListener("DOMContentLoaded", function () {
  // 초기 상태 설정
  let isGrayscale = false;

  // 컨테이너 생성
  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  // 아이콘 컨테이너 생성
  const iconContainer = document.createElement("div");
  container.appendChild(iconContainer);

  // 라벨 생성
  const iconLabel = document.createElement("div");
  iconLabel.className = "icon-label";
  iconLabel.textContent = isGrayscale ? "흑백 모드" : "컬러 모드";
  container.appendChild(iconLabel);

  // 토글 버튼 생성
  const toggleButton = document.createElement("button");
  toggleButton.className = "toggle-button";
  toggleButton.textContent = isGrayscale ? "컬러로 변경" : "흑백으로 변경";
  container.appendChild(toggleButton);

  // 아이콘 렌더링 함수
  function renderGoogleIcon() {
    // 기존 아이콘 제거
    iconContainer.innerHTML = "";

    // 색상 설정
    const colors = isGrayscale
      ? {
          main: "#BDBDBD",
          accent1: "#9E9E9E",
          accent2: "#BDBDBD",
          accent3: "#9E9E9E",
        }
      : {
          main: "#FFC107",
          accent1: "#FF3D00",
          accent2: "#4CAF50",
          accent3: "#1976D2",
        };

    // SVG 생성
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "0");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("x", "0px");
    svg.setAttribute("y", "0px");
    svg.setAttribute("viewBox", "0 0 48 48");
    svg.setAttribute("enable-background", "new 0 0 48 48");
    svg.setAttribute("height", "48");
    svg.setAttribute("width", "48");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.className = "google-icon";

    // 메인 패스
    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttribute("fill", colors.main);
    path1.setAttribute(
      "d",
      "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12" +
        "c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24" +
        "c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    );
    svg.appendChild(path1);

    // 액센트1 패스
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute("fill", colors.accent1);
    path2.setAttribute(
      "d",
      "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657" +
        "C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    );
    svg.appendChild(path2);

    // 액센트2 패스
    const path3 = document.createElementNS(svgNS, "path");
    path3.setAttribute("fill", colors.accent2);
    path3.setAttribute(
      "d",
      "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36" +
        "c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    );
    svg.appendChild(path3);

    // 액센트3 패스
    const path4 = document.createElementNS(svgNS, "path");
    path4.setAttribute("fill", colors.accent3);
    path4.setAttribute(
      "d",
      "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571" +
        "c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    );
    svg.appendChild(path4);

    // 아이콘 추가
    iconContainer.appendChild(svg);
  }

  // 토글 버튼 이벤트 리스너
  toggleButton.addEventListener("click", function () {
    isGrayscale = !isGrayscale;
    renderGoogleIcon();
    toggleButton.textContent = isGrayscale ? "컬러로 변경" : "흑백으로 변경";
    iconLabel.textContent = isGrayscale ? "흑백 모드" : "컬러 모드";
  });

  // 초기 아이콘 렌더링
  renderGoogleIcon();
});
