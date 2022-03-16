var old= document.body.innerHTML;
document.body.innerHTML="<video src='https://pinball3d.github.io/storage/crossiant.mp4' autoplay='on' loop></video>";
document.body.onKeyUp = function() {
document.body.innerHTML=old;
}
