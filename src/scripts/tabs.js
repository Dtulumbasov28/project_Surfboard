
$(".reviews-switcher__link").click((e) => {
  e.preventDefault();
});

const tabsBtn = document.querySelectorAll(".reviews-switcher__item");
const tabsItem = document.querySelectorAll(".reviews__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  tabsBtn.forEach(function (item) {
    item.addEventListener("click", function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains("active")) {
        tabsBtn.forEach(function (item) {
          item.classList.remove("active");
        });

        tabsItem.forEach(function (item) {
          item.classList.remove("active");
        });

        currentBtn.classList.add("active");
        currentTab.classList.add("active");
      }
    });
  });
}

document.querySelector(".reviews-switcher__item").click();
