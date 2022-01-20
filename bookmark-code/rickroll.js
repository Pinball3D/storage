var b = new Audio('https://pinball3d.github.io/storage/rick.mp3');
b.play();
document.body.onkeyup = function(key) {
if (key.keyCode==80) {
  var o = new Audio('https://pinball3d.github.io/storage/rick.mp3');
  o.play();
}
}
