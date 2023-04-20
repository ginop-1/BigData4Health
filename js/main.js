function close_cookie_banner() {
  document.getElementsByClassName("cookies-banner")[0].style.display = "none";
}

function close_cookie_footer() {
  document.getElementsByClassName("cookie-footer")[0].style.display = "none";
}

function acceptCookieConsent() {
  document.getElementById("cookie-notice").style.display = "none";
}

window.onload = function () {
  window.confirm("Click OK to accept the terms and conditions.");
  Swal.fire({
    title: "By clicking OK, you agree to all the cookies",
    text: "Once accepted, all your data will be stolen!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });
  document.getElementById("cookie-notice").style.display = "block";

  const cookieFooter = document.querySelector(".cookie-footer");
  cookieFooter.classList.add("active");
}

function getRandomColor() { //To give me a new rgb number everytime
  return (Math.floor(Math.random() * (255 - 10)) + 10);
}

function getColor() {
  return `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
}

(function changeColor() {
  setInterval((() => document.body.style.background = getColor()),
    1000);
})()

const swup = new Swup();