var body = "";
document.body.innerHTML="";
ws = new WebSocket("wss://Connect-Fun-Server.andrewsmiley.repl.co");
ws.onopen = function() {
  console.log("opened");
};
				
ws.onmessage = function (evt) { 
  var received_msg = evt.data;
  document.body.innerHTML = evt.data;
  body = document.body.innerHTML
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
