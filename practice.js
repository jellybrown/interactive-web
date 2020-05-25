const box = document.querySelector(".box");

function clickHandler(e) {
  console.log(e.currentTarget);
}

box.addEventListener("click", clickHandler);

function Person(fullname, age) {
  this.fullname = fullname;
  this.age = age;
}

const person1 = new Person("jellybrown", 26);
const person2 = new Person("gom", 10);
const person3 = new Person("mong", 11);

console.log(person3);

const box = document.querySelector(".box");

function noneEvent() {
  setTimeout(function () {
    box.style.display = "none";
  }, 2000);
}

box.addEventListener("click", noneEvent);
