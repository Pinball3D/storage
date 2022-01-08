var lnk = prompt('Go to google, find a image, right click and select "Copy Image Address", and that enter that link below:');
var theArray = document.getElementsByTagName("img");
for (let index = 0; index < theArray.length; ++index) {
    const element = theArray[index];
    element.src=lnk;
}
