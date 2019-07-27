// Initialise Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAIr73tfbcaTERPmTbYZfnWcwemF5Hm7IM",
    authDomain: "project1-c7e8d-68c8d.firebaseapp.com",
    databaseURL: "https://project1-c7e8d-68c8d.firebaseio.com",
    projectId: "project1-c7e8d",
    storageBucket: "",
    messagingSenderId: "1028263948344",
    appId: "1:1028263948344:web:c3cc8b011a46c270"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

// Initial values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

// Capture Button Click
$("#submit").on("click", function(event) {
    event.preventDefault();

// Grabbed values from text boxes
trainName = $("#name-input").val().trim();
destination = $("#destination-input").val().trim();
firstTime = $("#firstTime-input").val().trim();
frequency = $("#frequency-input").val().trim();

database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP 
});
});

database.ref().on("child_added", function(childSnapshot) {
    var sv = childSnapshot.val();
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTime);
    console.log(frequency);

    $("#trainlist").append(
        "<tr><td class='trainName'>" + sv.trainName 
        + "</td><td class='destination''>" + sv.destination 
        + "</td><td class='frequency''>" + sv.frequency 
        + "</td><td class='monthsworked''>" + "nextArrival" 
        + "</td><td class='totalbilled''>" + "minutesAway" + "</td></tr>"
        );
},
function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }

);