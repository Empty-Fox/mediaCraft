    ///////////////nav menu///////////
    let hamb = document.querySelector(".hamb");
    let navMenu = document.querySelector(".header__links ");
    let body = document.querySelector("body");
    let header = document.querySelector("header");

    hamb.addEventListener("click", mobileMenu);

    function mobileMenu() {
      hamb.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.classList.toggle("noscroll");

    }

////////////////////////////////////
  ///////////header scroll///////
  var className = "inverted";
  var scrollTrigger = 60;

  window.onscroll = function () {
    // We add pageYOffset for compatibility with IE.
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
      document.getElementsByTagName("header")[0].classList.add(className);
    } else {
      document.getElementsByTagName("header")[0].classList.remove(className);
    }
  };