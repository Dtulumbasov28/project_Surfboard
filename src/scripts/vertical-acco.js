const accordions = document.querySelectorAll(".team__title");

accordions.forEach((item) => {
  item.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      this.nextElementSibling.classList.remove("active");
    } else {
      accordions.forEach((item) => {
        item.classList.remove("active");
        item.nextElementSibling.classList.remove("active");
      });
      this.classList.add("active");
      this.nextElementSibling.classList.add("active");
    }
  });
});
