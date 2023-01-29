if (window.location.href == "http://example.com") {
    var body = "";
    document.body.innerHTML = "";
    ws = new WebSocket("ws://ec2-18-205-105-185.compute-1.amazonaws.com:5000/");
    ws.onopen = function() {
        console.log("opened");
    };

    ws.onmessage = function(evt) {
        var received_msg = evt.data;
        document.body.innerHTML = evt.data;
        body = document.body.innerHTML
    };

    ws.onclose = function() {
        console.log("Closed")
    };
    setInterval(function() {
        counter()
    }, 0);

    function counter() {
        if (document.body.innerHTML != body) {
            ws.send(document.body.innerHTML)
            body = document.body.innerHTML;
        }
    }
} else {
    alert("IMPORTANT: When you click ok, you will be brought to a new page. When you get to the new page, click this bookmark again.");
    window.location.href = "http://example.com";
}
