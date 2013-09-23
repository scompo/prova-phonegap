document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    
}

//NOTE: Picture Stuff.
function takePicture() {
    navigator.camera.getPicture(onSuccessImg, onFailImg, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
}

function onSuccessImg(imageData) {
    $("#img-pic").attr("src", "data:image/jpeg;base64," + imageData);
}

function onFailImg(message) {
    alert('Failed because: ' + message);
}

//NOTE: Geolocation stuff.

function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccessGPS, onFailGPS);
}

var onSuccessGPS = function(position) {
    $("#location-contents").html( 'Latitude: '          + position.coords.latitude          + '\n' +
                                  'Longitude: '         + position.coords.longitude         + '\n' +
                                  'Altitude: '          + position.coords.altitude          + '\n' +
                                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                                  'Heading: '           + position.coords.heading           + '\n' +
                                  'Speed: '             + position.coords.speed             + '\n' +
                                  'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onFailGPS(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

