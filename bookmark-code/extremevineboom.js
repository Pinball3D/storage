var sel = "You Selected: ";
function func() {
var s = new Audio('https://pinball3d.github.io/storage/Vine_Boom_Sound_Effect.mp3');
  s.play();
}
if(confirm("Would you like it to activate on click? Cancel = no")) {
document.body.onclick = func;
sel = sel+"Click, ";
}
if(confirm("Would you like it to activate on key press? Cancel = no")) {
document.body.onkeyup = func;
sel = sel+"Key, ";
}
if(confirm("Would you like it to activate on scroll? Cancel = no")) {
document.body.onwheel = func;
sel = sel+"Scroll, ";
}
alert(sel);
