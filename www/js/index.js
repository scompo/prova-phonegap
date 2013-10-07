$(document).ready( onDeviceReady );

//document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//
function onDeviceReady() {
    createXMLPage();
    loadXML();
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
    $("#location-contents").html( 'Latitude: '          + position.coords.latitude          + '<br/>' +
                                  'Longitude: '         + position.coords.longitude         + '<br/>' +
                                  'Altitude: '          + position.coords.altitude          + '<br/>' +
                                  'Accuracy: '          + position.coords.accuracy          + '<br/>' +
                                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
                                  'Heading: '           + position.coords.heading           + '<br/>' +
                                  'Speed: '             + position.coords.speed             + '<br/>' +
                                  'Timestamp: '         + position.timestamp                + '<br/>');
}

// onError Callback receives a PositionError object
//
function onFailGPS(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//NOTE: xml stuff.

//Create the collapsibles.
function createXMLPage(){
    $("#premessa-ul").text("");
    $("#intro-ul").text("");
}

//Load xml files contents.
function loadXML() {
    $.ajax({
        type: "GET",
        //url: "http://www.guidaalcrossmedia.it/XML/CMPCpremessatru.xml",
        url: "./CMPCpremessatru.xml",
        dataType: "xml",
        success: parseXMLPremessa,
        error: onFailXML
    });
    $.ajax({
        type: "GET",
        //url: "http://www.guidaalcrossmedia.it/XML/CMPintro.xml",
        url: "./CMPintro.xml",
        dataType: "xml",
        success: parseXMLIntro,
        error: onFailXML
    });
}

function onFailXML(error){
    alert(error.toString());
}

//parse the xml and put it into the collapsibles.
function parseXMLIntro(xml){
    $(xml).find("paragrafo").each(function()
    {   
        var $divTemp = $('<div/>').attr("data-role", "collapsible");
        $(this).find('titolo').each(function(){
            var $h1Temp = $('<h3/>').text($(this).text());
            $divTemp.append($h1Temp);
        });
        $(this).find('testo').each(function(){
            var $pTemp = $("<p/>").append($(this).text());
            //alert($(this).text());
            $divTemp.append($pTemp);
        });
        $("#intro-ul").append($divTemp);
    });
}

//parse the xml and put it into the collapsibles.
function parseXMLPremessa(xml){
    $(xml).find("paragrafo").each(function()
    {   
        var $divTemp = $('<div/>').attr("data-role", "collapsible");
        $(this).find('titolo').each(function(){
            var $h1Temp = $('<h3/>').text($(this).text());
            $divTemp.append($h1Temp);
        });
        $(this).find('testo').each(function(){
            var $pTemp = $("<p/>").append($(this).text());
            //alert($(this).text());
            $divTemp.append($pTemp);
        });
        $("#premessa-ul").append($divTemp);
    });
}

//NOTE: DATABASE STUFF.

// Populate the database
//
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    var len = results.rows.length;
    $("#query-contents").html("DEMO table: " + len + " rows found. <br/>");
    for (var i=0; i<len; i++){
        $("#query-contents").append("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data+"<br/>");
    }
}

// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(queryDB, errorCB);
}

// device APIs are available
//
function QueryDB() {
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}
