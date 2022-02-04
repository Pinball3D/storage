var url = prompt("Image URL: ");
document.body.onclick = function(ev) {
    var x = ev.clientX;
    var y = ev.clientY
    console.log(x, y);
    var sytle = "top: "+y+"px; left: "+x+"px; position: absolute; transform: translate(-50%, -50%);";
    var ele = document.createElement("img");
    ele.style=sytle;
    ele.src=url;
    document.body.appendChild(ele);
}
