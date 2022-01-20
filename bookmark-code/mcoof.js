var url = "https://pinball3d.github.io/storage/oof.mp3";
var o = new Audio(url);
o.play();
document.body.onkeyup = function(key) {
if (key.keyCode==80) {
var audio = new Audio(url);
audio.play();
}
}
