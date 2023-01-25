var body = "";
document.body.innerHTML="<div id='content'></div>"
document.body.style="margin: 0; padding: 0; overflow: auto;"
var selector = document.createElement("div");
selector.style = "background-color: #333; overflow: auto; white-space: nowrap; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; bottom: 0px; position: absolute;"
ws = new WebSocket("wss://Connect-Fun-Server.andrewsmiley.repl.co");
ws.onopen = function() {
  console.log("opened");
};
				
ws.onmessage = function (evt) { 
  var received_msg = evt.data;
  document.body.innerHTML = evt.data;
  body = evt.data
};
				
ws.onclose = function() { 
  console.log("Closed")
};
setInterval(function() { counter() }, 0);
function counter()
{
  if (document.body.innerHTML != body) {
    ws.send(document.body.innerHTML)
    body = document.body.innerHTML;
  }
}
