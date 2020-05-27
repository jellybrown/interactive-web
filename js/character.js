function Character(info) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character", "running");
  this.mainElem.innerHTML =
    "" +
    '<div class="character-face-con character-head">' +
    '<div class="character-face character-head-face face-front"></div>' +
    '<div class="character-face character-head-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-torso">' +
    '<div class="character-face character-torso-face face-front"></div>' +
    '<div class="character-face character-torso-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-arm character-arm-right">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-arm character-arm-left">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-leg character-leg-right">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-leg character-leg-left">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    "</div>";
  document.querySelector(".stage").appendChild(this.mainElem);

  this.mainElem.style.left = info.xPos + "%"; //위치 대입하기
  this.scrollState = false;
  this.lastScrollTop = 0; //바로 이전스크롤 위치
  this.xPos = info.xPos; //아예 객체의 속성으로 등록 -> 유용함
  this.speed = 1; // 좌우 스피드 셋팅
  this.direction; //방향
  this.runningState = false; //좌우 이동 중인지 아닌지 확인
  this.rafId;
  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;

    window.addEventListener("scroll", function () {
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      //이전 스크롤 위치와 현재 스크롤 위치를 비교
      if (self.lastScrollTop > pageYOffset) {
        //이전 스크롤 위치가 크다면: 스크롤 올림
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        //현재 스크롤 위치가 크다면: 스크롤 내림
        self.mainElem.setAttribute("data-direction", "forward");
      }

      self.lastScrollTop = pageYOffset;
    });

    window.addEventListener("keydown", function (e) {
      if (self.runningState) return; //true라면 리턴이 되면서, 아래가 실행되지 않음

      //왼쪽, 오른쪽으로 몸돌리고 움직임추가
      if (e.keycode == 37) {
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        self.mainElem.classList.add("running");
        self.run(self); // rub메서드 실행
        self.runningState = true; // 트루가 되는순간 리턴됨
      } else if (e.keycode == 39) {
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run(self); // rub메서드 실행
        self.runningState = true;
      }
    });

    window.addEventListener("keyup", function () {
      self.mainElem.classList.remove("running");
      cancelAnimationFrame(self.rafId);
      self.runningState = false; //키를 떼는순간 runningState 초기화를 해야 우측도 움직임
    });
  },

  run: function (self) {
    //부드럽게 처리하기 위해 run 메서드 추가

    if (self.direction == "left") {
      self.xPos -= self.speed; //왼쪽 방향으로
    } else if (self.direction == "right") {
      self.xPos += self.speed; //오른쪽 방향으로
    }

    if (self.xPos < 2) {
      //왼쪽 자리 한계지정
      self.xPos = 2;
    }
    if (self.xPos < 88) {
      //오른쪽 자리 한계지정
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + "%";

    //requestAnimationFrame(self.run); 실행컨텍스드 바껴서 안됨

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  },
};
