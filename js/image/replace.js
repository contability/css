/**
 * Image Replace (IR) 전략 구현
 * 다양한 이미지 교체 기법들을 JavaScript로 구현
 */

class ImageReplacer {
  constructor() {
    this.imageMap = {
      dog: "../../assets/img/dog.png",
      tree: "../../assets/img/tree.png",
      back: "../../assets/img/back.jpg",
    };

    this.currentTheme = "light";
    this.isLoading = false;

    this.init();
  }

  /**
   * 초기화 함수
   */
  init() {
    this.setupInteractiveImageReplace();
    this.setupThemeBasedReplace();
    this.setupLoadingStateReplace();
    this.setupKeyboardNavigation();
    this.setupIntersectionObserver();
    this.setupWebPSupport();
    this.setupAnimatedReplace();
    this.setupAccessibleReplace();
  }

  /**
   * 3. 명령적 IR - 상호작용 기반 이미지 교체
   */
  setupInteractiveImageReplace() {
    const interactiveImg = document.getElementById("interactive-img");
    const buttons = document.querySelectorAll(".btn[data-img]");

    if (!interactiveImg || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const imgType = e.target.dataset.img;
        this.replaceImage(interactiveImg, imgType);

        // 버튼 활성 상태 관리
        buttons.forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");

        // 접근성: 스크린 리더에 변경 사항 알림
        this.announceImageChange(imgType);
      });

      // 키보드 접근성
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });
    });

    // 초기 버튼 활성 상태 설정
    buttons[0]?.classList.add("active");
  }

  /**
   * 5. 테마 기반 IR
   */
  setupThemeBasedReplace() {
    const themeImg = document.getElementById("theme-img");
    const themeButtons = document.querySelectorAll(".theme-btn");

    if (!themeImg || !themeButtons.length) return;

    themeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const theme = e.target.dataset.theme;
        this.changeTheme(theme, themeImg);

        // 버튼 활성 상태 관리
        themeButtons.forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");
      });
    });

    // 초기 테마 설정
    themeButtons[0]?.classList.add("active");
  }

  /**
   * 6. 상태 기반 IR - 로딩 상태
   */
  setupLoadingStateReplace() {
    const loadBtn = document.getElementById("load-btn");
    const loadingImg = document.getElementById("loading-img");
    const loadingOverlay = document.getElementById("loading-overlay");

    if (!loadBtn || !loadingImg || !loadingOverlay) return;

    loadBtn.addEventListener("click", () => {
      this.simulateImageLoading(loadingImg, loadingOverlay);
    });
  }

  /**
   * 이미지 교체 함수
   */
  replaceImage(imgElement, imageType) {
    if (!imgElement || !this.imageMap[imageType]) return;

    // 페이드 아웃 효과
    imgElement.style.opacity = "0";

    setTimeout(() => {
      imgElement.src = this.imageMap[imageType];
      imgElement.style.opacity = "1";

      // alt 텍스트 업데이트 (접근성)
      const altTexts = {
        dog: "강아지 이미지",
        tree: "나무 이미지",
        back: "배경 이미지",
      };
      imgElement.alt = altTexts[imageType] || "이미지";
    }, 150);
  }

  /**
   * 테마 변경 함수
   */
  changeTheme(theme, imgElement) {
    this.currentTheme = theme;

    // 바디에 테마 클래스 적용
    document.body.className = theme === "dark" ? "dark-theme" : "";

    // 테마에 따른 이미지 변경
    const themeImages = {
      light: "dog",
      dark: "tree",
    };

    this.replaceImage(imgElement, themeImages[theme]);

    // 로컬 스토리지에 테마 저장
    localStorage.setItem("theme", theme);

    // 접근성: 테마 변경 알림
    this.announceThemeChange(theme);
  }

  /**
   * 로딩 상태 시뮬레이션
   */
  simulateImageLoading(imgElement, overlayElement) {
    if (this.isLoading) return;

    this.isLoading = true;
    overlayElement.classList.add("active");

    // 랜덤한 이미지 선택
    const imageTypes = Object.keys(this.imageMap);
    const randomImage =
      imageTypes[Math.floor(Math.random() * imageTypes.length)];

    // 2-4초 후 로딩 완료
    const loadTime = Math.random() * 2000 + 2000;

    setTimeout(() => {
      imgElement.src = this.imageMap[randomImage];
      overlayElement.classList.remove("active");
      this.isLoading = false;

      // 로딩 완료 알림
      this.announceLoadingComplete();
    }, loadTime);
  }

  /**
   * 키보드 네비게이션 설정
   */
  setupKeyboardNavigation() {
    // 숫자 키로 이미지 교체 (1, 2, 3)
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;

      const interactiveImg = document.getElementById("interactive-img");
      if (!interactiveImg) return;

      const keyMap = {
        1: "dog",
        2: "tree",
        3: "back",
      };

      if (keyMap[e.key]) {
        this.replaceImage(interactiveImg, keyMap[e.key]);

        // 해당 버튼도 활성화
        const button = document.querySelector(`[data-img="${keyMap[e.key]}"]`);
        if (button) {
          document
            .querySelectorAll(".btn[data-img]")
            .forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        }
      }
    });
  }

  /**
   * Intersection Observer로 지연 로딩 구현
   */
  setupIntersectionObserver() {
    const images = document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadLazyImage(img);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.1,
      }
    );

    images.forEach((img) => imageObserver.observe(img));
  }

  /**
   * 지연 로딩 이미지 로드
   */
  loadLazyImage(img) {
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = tempImg.src;
      img.classList.add("loaded");
      this.createAriaLiveAnnouncement("이미지가 로드되었습니다");
    };
    tempImg.onerror = () => {
      img.alt = "이미지를 불러올 수 없습니다";
      img.classList.add("error");
    };
    tempImg.src = img.dataset.src;
  }

  /**
   * 7. WebP 지원 및 포맷 최적화
   */
  setupWebPSupport() {
    const webpTestBtn = document.getElementById("webp-test-btn");
    const formatToggleBtn = document.getElementById("format-toggle-btn");
    const webpStatus = document.getElementById("webp-status");
    const webpImg = document.getElementById("webp-img");

    if (!webpTestBtn || !webpStatus) return;

    // WebP 지원 테스트
    webpTestBtn.addEventListener("click", async () => {
      const supportsWebP = await AdvancedImageReplacer.checkWebPSupport();
      webpStatus.textContent = supportsWebP
        ? "WebP 지원: 예 (최적화된 이미지 사용 가능)"
        : "WebP 지원: 아니오 (JPEG/PNG 사용)";
      webpStatus.style.color = supportsWebP ? "#27ae60" : "#e74c3c";
    });

    // 포맷 전환
    if (formatToggleBtn && webpImg) {
      let currentFormat = "original";
      formatToggleBtn.addEventListener("click", () => {
        const formats = {
          original: "../../assets/img/dog.png",
          alternative: "../../assets/img/tree.png",
        };

        currentFormat =
          currentFormat === "original" ? "alternative" : "original";
        webpImg.src = formats[currentFormat];

        this.createAriaLiveAnnouncement(
          `이미지 포맷이 ${currentFormat}로 변경되었습니다`
        );
      });
    }
  }

  /**
   * 8. 애니메이션 기반 이미지 교체
   */
  setupAnimatedReplace() {
    const animatedImg = document.getElementById("animated-img");
    const animationButtons = document.querySelectorAll("[data-animation]");

    if (!animatedImg || !animationButtons.length) return;

    let imageIndex = 0;
    const images = Object.values(this.imageMap);

    animationButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const animationType = e.target.dataset.animation;
        imageIndex = (imageIndex + 1) % images.length;

        this.animateImageReplace(
          animatedImg,
          images[imageIndex],
          animationType
        );

        // 버튼 활성 상태 관리
        animationButtons.forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");
      });
    });
  }

  /**
   * 애니메이션 이미지 교체 함수
   */
  async animateImageReplace(imgElement, newSrc, animationType) {
    const animations = {
      fade: () => this.fadeAnimation(imgElement, newSrc),
      slide: () => this.slideAnimation(imgElement, newSrc),
      flip: () => this.flipAnimation(imgElement, newSrc),
      zoom: () => this.zoomAnimation(imgElement, newSrc),
    };

    const animationFn = animations[animationType] || animations.fade;
    await animationFn();

    this.createAriaLiveAnnouncement(
      `${animationType} 애니메이션으로 이미지가 변경되었습니다`
    );
  }

  /**
   * 페이드 애니메이션
   */
  fadeAnimation(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.opacity = "0";
      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.style.opacity = "1";
        resolve();
      }, 300);
    });
  }

  /**
   * 슬라이드 애니메이션
   */
  slideAnimation(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.transform = "translateX(-100%)";
      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.style.transform = "translateX(0)";
        resolve();
      }, 300);
    });
  }

  /**
   * 플립 애니메이션
   */
  flipAnimation(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.transform = "rotateY(90deg)";
      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.style.transform = "rotateY(0deg)";
        resolve();
      }, 150);
    });
  }

  /**
   * 줌 애니메이션
   */
  zoomAnimation(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.transform = "scale(0)";
      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.style.transform = "scale(1)";
        resolve();
      }, 300);
    });
  }

  /**
   * 10. 접근성 고려 이미지 교체
   */
  setupAccessibleReplace() {
    const accessibleImg = document.getElementById("accessible-img");
    const accessibleButtons = document.querySelectorAll(
      "[data-accessible-img]"
    );

    if (!accessibleImg || !accessibleButtons.length) return;

    accessibleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const imgType = e.target.dataset.accessibleImg;
        this.replaceAccessibleImage(accessibleImg, imgType);

        // 버튼 활성 상태 관리
        accessibleButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-pressed", "false");
        });
        e.target.classList.add("active");
        e.target.setAttribute("aria-pressed", "true");
      });

      // ARIA 속성 초기화
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("role", "button");
    });

    // 초기 버튼 상태 설정
    accessibleButtons[0]?.classList.add("active");
    accessibleButtons[0]?.setAttribute("aria-pressed", "true");
  }

  /**
   * 접근성을 고려한 이미지 교체
   */
  replaceAccessibleImage(imgElement, imageType) {
    if (!imgElement || !this.imageMap[imageType]) return;

    // 상세한 alt 텍스트 매핑
    const detailedAltTexts = {
      dog: "귀여운 강아지가 앉아있는 모습의 이미지",
      tree: "푸른 잎이 무성한 큰 나무가 있는 자연 풍경 이미지",
      back: "아름다운 자연 배경이 있는 풍경 이미지",
    };

    // 로딩 상태 표시
    imgElement.setAttribute("aria-busy", "true");

    // 페이드 아웃 효과
    imgElement.style.opacity = "0";

    setTimeout(() => {
      imgElement.src = this.imageMap[imageType];
      imgElement.alt = detailedAltTexts[imageType] || "이미지";
      imgElement.style.opacity = "1";
      imgElement.setAttribute("aria-busy", "false");

      // 접근성: 이미지 변경 알림
      this.createAriaLiveAnnouncement(
        `${detailedAltTexts[imageType]}로 변경되었습니다`
      );
    }, 150);
  }

  /**
   * 접근성: 이미지 변경 알림
   */
  announceImageChange(imageType) {
    const announcements = {
      dog: "강아지 이미지로 변경되었습니다",
      tree: "나무 이미지로 변경되었습니다",
      back: "배경 이미지로 변경되었습니다",
    };

    this.createAriaLiveAnnouncement(announcements[imageType]);
  }

  /**
   * 접근성: 테마 변경 알림
   */
  announceThemeChange(theme) {
    const announcement =
      theme === "dark"
        ? "다크 테마로 변경되었습니다"
        : "라이트 테마로 변경되었습니다";

    this.createAriaLiveAnnouncement(announcement);
  }

  /**
   * 접근성: 로딩 완료 알림
   */
  announceLoadingComplete() {
    this.createAriaLiveAnnouncement("이미지 로딩이 완료되었습니다");
  }

  /**
   * aria-live 영역을 통한 스크린 리더 알림
   */
  createAriaLiveAnnouncement(message) {
    let liveRegion = document.getElementById("aria-live-region");

    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "aria-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.style.position = "absolute";
      liveRegion.style.left = "-10000px";
      liveRegion.style.width = "1px";
      liveRegion.style.height = "1px";
      liveRegion.style.overflow = "hidden";
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;
  }

  /**
   * 저장된 테마 복원
   */
  restoreTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const themeButton = document.querySelector(
        `[data-theme="${savedTheme}"]`
      );
      if (themeButton) {
        themeButton.click();
      }
    }
  }
}

// 고급 이미지 교체 유틸리티
class AdvancedImageReplacer {
  /**
   * 이미지 프리로딩
   */
  static preloadImages(imageUrls) {
    const promises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    });

    return Promise.all(promises);
  }

  /**
   * WebP 지원 확인 후 이미지 교체
   */
  static async replaceWithWebP(imgElement, basePath) {
    const supportsWebP = await this.checkWebPSupport();
    const extension = supportsWebP ? ".webp" : ".jpg";
    imgElement.src = basePath + extension;
  }

  /**
   * WebP 지원 확인
   */
  static checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  }

  /**
   * 이미지 교체 애니메이션
   */
  static animateImageReplace(imgElement, newSrc, animationType = "fade") {
    const animations = {
      fade: this.fadeTransition,
      slide: this.slideTransition,
      flip: this.flipTransition,
    };

    const animationFn = animations[animationType] || animations.fade;
    return animationFn(imgElement, newSrc);
  }

  /**
   * 페이드 전환 애니메이션
   */
  static fadeTransition(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.transition = "opacity 0.3s ease";
      imgElement.style.opacity = "0";

      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.onload = () => {
          imgElement.style.opacity = "1";
          resolve();
        };
      }, 300);
    });
  }

  /**
   * 슬라이드 전환 애니메이션
   */
  static slideTransition(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.transition = "transform 0.3s ease";
      imgElement.style.transform = "translateX(-100%)";

      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.onload = () => {
          imgElement.style.transform = "translateX(0)";
          resolve();
        };
      }, 300);
    });
  }

  /**
   * 플립 전환 애니메이션
   */
  static flipTransition(imgElement, newSrc) {
    return new Promise((resolve) => {
      imgElement.style.transition = "transform 0.3s ease";
      imgElement.style.transform = "rotateY(90deg)";

      setTimeout(() => {
        imgElement.src = newSrc;
        imgElement.onload = () => {
          imgElement.style.transform = "rotateY(0deg)";
          resolve();
        };
      }, 150);
    });
  }
}

// DOM이 로드되면 초기화
document.addEventListener("DOMContentLoaded", () => {
  const imageReplacer = new ImageReplacer();

  // 저장된 테마 복원
  imageReplacer.restoreTheme();

  // 이미지 프리로딩
  const imagesToPreload = Object.values(imageReplacer.imageMap);
  AdvancedImageReplacer.preloadImages(imagesToPreload)
    .then(() => {
      console.log("모든 이미지가 프리로드되었습니다.");
    })
    .catch((error) => {
      console.error("이미지 프리로드 중 오류 발생:", error);
    });
});

// 전역 객체로 노출 (디버깅용)
window.ImageReplacer = ImageReplacer;
window.AdvancedImageReplacer = AdvancedImageReplacer;
