var old = document.body.innerHTML;
document.body.innerHTML="<img src='https://pinball3d.github.io/storage/rock.gif'></img>";
document.body.onkeyup = function() {
document.body.innerHTML=old;
}
