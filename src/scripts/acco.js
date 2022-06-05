const accordions = document.querySelectorAll(".team__title");
const content = document.querySelectorAll(".team__content");

accordions.forEach((item) => {
  item.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      accordions.forEach((item) => {
        item.classList.remove("active");
        item.nextElementSibling.classList.remove("active");
      });
    }
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("active");
  });
});
