var req = new XMLHttpRequest();
req.open('GET','https://unblockerserver.herokuapp.com/?url='+document.location.href,false);
console.log(req.status);
req.send('');
document.write(req.responseText);
