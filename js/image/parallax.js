// 요소 선택
const dogElement = document.querySelector(".dog");
const bgElement = document.querySelector(".bg");
const text3dElement = document.querySelector(".text3d");
const treeElement = document.querySelector(".tree");

// 변수 초기화
let x = 0;
let y = 0;
let mx = 0;
let my = 0;

// 마우스 이동 이벤트 핸들러
const handleMouseMove = (e) => {
  // 마우스 위치를 화면 중앙을 기준으로 계산
  x = e.clientX - window.innerWidth / 2;
  y = e.clientY - window.innerHeight / 2;
};

// 애니메이션 루프
const loop = () => {
  // 움직임 속도 조절 (낮을수록 더 부드럽게 이동)
  const speed = 0.009;

  // 현재 위치에서 목표 위치까지 부드럽게 이동
  mx += (x - mx) * speed;
  my += (y - my) * speed;

  // 각 요소마다 다른 속도로 이동하여 깊이감 생성
  // 강아지 이동
  dogElement.style.transform = `translate(${mx / 9}px, ${my / 9}px)`;

  // 배경 이동
  bgElement.style.transform = `translate(${mx / 8}px, ${-(my / 8)}px)`;

  // 텍스트 3D 효과 (회전과 이동 조합)
  text3dElement.style.transform = `translate3d(${-(mx / 5)}px, ${-(
    my / 5
  )}px, 0) rotate3d(0, 1, 0, ${-mx / 50}deg)`;

  // 파이프 이동
  treeElement.style.transform = `translate(${mx / 4}px, ${my / 3}px)`;

  // 다음 프레임에 다시 루프 실행
  window.requestAnimationFrame(loop);
};

// 이벤트 리스너 등록 및 애니메이션 시작
window.addEventListener("mousemove", handleMouseMove);
loop();
