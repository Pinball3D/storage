function getGeoLocation(forceUpdate, callBack) {
  var options = null;
  if (forceUpdate) {
    options = {
      maximumAge: 1,
      timeout: 10000,
    };
  } else {
    options = {
      maximumAge: 600000,
      timeout: 10000,
    }
  }
  navigator.geolocation.getCurrentPosition(
    function (position) {
      sessionStorage.setItem("currentGeoPosition", JSON.stringify(position));

      checkGeoAccess($("#siteId").val(), position.coords.latitude, position.coords.longitude,
        function (result) {
          callBack(true);
          return;
        },
        function (error) {
          callBack(true);
          return;
        }
      );
    },
    function (error) {
      console.log("Error occured while getting geolocation. Error code: " + error.code);
      callBack(true);
    },
    options
  );
}
function requireGeoLocation() {
  return ($("#_useGeoFence").val() ?? "false") === "true";
}
