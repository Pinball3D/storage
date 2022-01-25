var audio = new Audio("https://pinball3d.github.io/storage/burgerking.mp3");
audio.play();
document.body.onkeyup = function(key) {if (key.keyCode == 80) {
  var s = new Audio('https://pinball3d.github.io/storage/burgerking.mp3');       
  s.play();
}
}
