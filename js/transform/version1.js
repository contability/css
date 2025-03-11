let album_list = document.querySelector(".album-list");
let album_player_show = document.querySelector("#album-player-show");

album_player_show.addEventListener("change", function () {
  if (this.checked) {
    album_list.classList.add("all-view-albums");
  } else {
    album_list.classList.remove("all-view-albums");
  }
});
