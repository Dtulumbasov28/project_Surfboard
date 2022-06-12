const musureWidth = (item) => {
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".horizontal-menu");
  const titlesBlocks = container.find(".horizontal-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".horizontal-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft,
  };
};

const closeEveryItemInContainer = (container) => {
  const items = container.find(".horizontal-menu__item");
  const content = container.find(".horizontal-menu__content");

  items.removeClass("active");
  content.width(0);
};

const openItem = (item) => {
  const hiddenContent = item.find(".horizontal-menu__content");
  const reqWidth = musureWidth(item);
  const textBlock = item.find(".horizontal-menu__container");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".horizontal-menu__title").on("click", (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".horizontal-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".horizontal-menu");

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    openItem(item);
  }
});

$(".horizontal-menu__close").on("click", (e) => {
  e.preventDefault();

  closeEveryItemInContainer($(".horizontal-menu"));
});
