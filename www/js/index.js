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

