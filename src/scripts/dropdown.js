$(document).ready(function () {
  $(".dropdown__ingredients").hover(function () {
    $('.dropdown__table').show();
  }, 
  function () {
    $('.dropdown__table').hide();
  });
});