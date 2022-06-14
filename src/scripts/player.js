let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "cOHc2TSvCI8",
    controls: 0,
  });
}
