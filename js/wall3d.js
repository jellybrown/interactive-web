(function () {
  const houseElem = document.querySelector(".house");
  const stageElem = document.querySelector(".stage");
  const barElem = document.querySelector(".progress-bar");
  const mousePos = { x: 0, y: 0 };

  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
    //전체문서높이 - 내가보는 화면 = 스크롤 할 수있는 부분
  }

  window.addEventListener("scroll", function () {
    const scrollPer = pageYOffset / maxScrollValue; //제일 아래로 내리면 1 (비율계산)
    const zMove = scrollPer * 950 - 490; //하우스를 -490해놨었기 때문에 -490, *950인 이유는 마지막에  wall이 꽉 안차게 하기위해
    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    //progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", function (e) {
    //가운데를 0으로 잡고, 각영역을 1과 -1로 봄
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform =
      "rotateX(" +
      mousePos.y * 5 +
      "deg)" +
      "rotateY(" +
      mousePos.x * 5 +
      "deg)";
  });
  //회전값을 줄때, x축이 기준일땐 상하로 각도가 변하니까 y가 변하는 것이고,
  //y축 기준일땐 좌우로 각도가 변하니까 x가 변한다.

  window.addEventListener("resize", resizeHandler); //화면크기 조정시마다 새로 조정
  resizeHandler(); //여기서 초기화
})();
