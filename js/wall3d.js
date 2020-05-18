(function () {
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");

  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 950 - 490;
    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    //progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });
  window.addEventListener("resize", resizeHandler); //화면크기조정시마다 새로 조정
  resizeHandler(); //여기서 초기화
})();
