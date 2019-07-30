// Initialise Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAYs_aFFSeF7yZh4UhZnadxzz31pk4nKU4",
  authDomain: "linh-s-awesome-project-1.firebaseapp.com",
  databaseURL: "https://linh-s-awesome-project-1.firebaseio.com",
  projectId: "linh-s-awesome-project-1",
  storageBucket: "linh-s-awesome-project-1.appspot.com",
  messagingSenderId: "930128857726",
  appId: "1:930128857726:web:2ed2b1d7d8d94dfd"
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
    const sv = childSnapshot.val();
    const firstTimeConverted = moment(sv.firstTime, "HH:mma");

    const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    const tRemainder = diffTime % parseInt(sv.frequency, 10);
    const tMinutesTillTrain = parseInt(sv.frequency, 10) - tRemainder;
    const nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#trainlist").append(
        "<tr><td class='trainName'>" + sv.trainName 
        + "</td><td class='destination''>" + sv.destination 
        + "</td><td class='frequency''>" + sv.frequency 
        + "</td><td class='nextArrival''>" + moment(nextTrain).format('HH:mm')
        + "</td><td class='minutesAway''>" + tMinutesTillTrain + "</td></tr>"
        );
},

function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }

);
