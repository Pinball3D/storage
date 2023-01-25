var b = document.createElement("audio");
b.src = 'https://pinball3d.github.io/storage/rick.mp3';
b.autoplay="autoplay"
document.body.appendChild(b);
document.body.onkeyup = function(key) {
if (key.keyCode==80) {
  var b = document.createElement("audio");
  b.src = 'https://pinball3d.github.io/storage/rick.mp3';
  b.autoplay="autoplay"
  document.body.appendChild(b);
 }
}
