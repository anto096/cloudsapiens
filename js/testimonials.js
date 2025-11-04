const track = document.getElementById("reelTrack");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

btnLeft.onclick = () => track.scrollBy({ left: -260, behavior: "smooth" });
btnRight.onclick = () => track.scrollBy({ left: 260, behavior: "smooth" });

const videos = document.querySelectorAll("video[data-src]");

// Helper function to fully reset a video
function resetVideo(v) {
  v.pause();
  v.muted = true;
  v.removeAttribute("src");
  v.load(); // forces browser to revert to poster
}

// Click behavior
videos.forEach((video) => {
  video.addEventListener("click", () => {
    videos.forEach((v) => {
      if (v !== video) resetVideo(v);
    });

    if (!video.src) {
      // load and play fresh
      video.src = video.dataset.src;
      video.load();
      video.muted = false;
      video.play();
    } else if (video.paused) {
      video.muted = false;
      video.play();
    } else {
      resetVideo(video);
    }
  });
});