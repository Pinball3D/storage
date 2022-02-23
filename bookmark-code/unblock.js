var req = new XMLHttpRequest();
req.open('GET','https://unblocker.andrewsmiley.repl.co/?url='+document.location.href,false);
req.send('');
document.write(req.responseText);
