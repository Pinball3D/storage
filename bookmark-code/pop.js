style = document.createElement("style");
style.id="bbbbbbbbbStYYYleeekkfdsdaarf";
style.innerHTML="* {cursor: url('https://pinball3d.github.io/storage/closepop.png'), move}";
document.head.appendChild(style)
document.body.onmousedown = function(ev) {
    new Audio("https://pinball3d.github.io/storage/pop.mp3").play();
    document.getElementById("bbbbbbbbbStYYYleeekkfdsdaarf").innerHTML="* {cursor: url('https://pinball3d.github.io/storage/openpop.png'), move}";
}
document.body.onmouseup = function(ev) {
    document.getElementById("bbbbbbbbbStYYYleeekkfdsdaarf").innerHTML="* {cursor: url('https://pinball3d.github.io/storage/closepop.png'), move}";
}
