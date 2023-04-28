const btnCall = document.querySelector(".btnCall");


btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");

    menuMo.classList.toggle('on');

}