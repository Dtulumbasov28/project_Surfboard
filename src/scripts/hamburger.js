$(document).ready(function () {
  $("#show").click(function () {
    $(".fullscreen-menu").show();
  });

  $(".menu__item").click(function () {
    $(".fullscreen-menu").hide();
  });

  $(".fullscreen-menu__close").click(function () {
    $(".fullscreen-menu").hide();
  });
});
