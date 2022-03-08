var req = new XMLHttpRequest();
req.open('GET','https://unblockerserver.herokuapp.com/?url='+document.location.href,false);
req.send('');
console.log(req.status);
document.write(req.responseText);
