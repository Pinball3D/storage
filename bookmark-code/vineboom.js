var sound = new Audio('https://pinball3d.github.io/storage/Vine_Boom_Sound_Effect.mp3');
sound.play();
document.body.onkeyup = function(key) {
if (key.keyCode == 80) {
  var s = new Audio('https://pinball3d.github.io/storage/Vine_Boom_Sound_Effect.mp3');
  s.play();
}
}
