
setTimeout(() => {
  const newWindow = window.open('https://nhs.newtown.k12.ct.us/NHSPrincipal/');
  newWindow.onload = function() {
    newWindow.document.querySelector("img[src='/_theme/images/Klong.png']").src="https://imgix.bustle.com/uploads/image/2024/7/24/fb89d756/screen-shot-2024-07.png?w=320&h=525&fit=crop&crop=faces&q=50&dpr=2"
    newWindow.console.log('New window loaded and script executed!');
  };
});
