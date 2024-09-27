const newWindow = window.open('https://nhs.newtown.k12.ct.us/');
newWindow.onload = function() {
  newWindow.document.body.innerHTML = newWindow.document.body.innerHTML + "<div style='position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: red; font-family: arial; font-size: 60px; padding: 10px; text-align: center;'>This website has been hacked.</br>Pay $99999 to the order of skibid toilet to be unhacked</div>"
  newWindow.console.log('New window loaded and script executed!');
};
