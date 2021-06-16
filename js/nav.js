$(document).ready(() => {
  $(".menu-icon").click(() => {
    $(".navbar-links").toggleClass("nav-active");
    $(".menu-icon").toggleClass("toggle");
  });
});
