$(document).ready(function () {
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyCUTdbnr2gPNfY7iwHNfDBHcbfNZJGjZuM",
        authDomain: "train-scheduler-97c9c.firebaseapp.com",
        databaseURL: "https://train-scheduler-97c9c.firebaseio.com",
        projectId: "train-scheduler-97c9c",
        storageBucket: "train-scheduler-97c9c.appspot.com",
        messagingSenderId: "649155842682"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //on click event
    $("#add-train").on("click", function () {
        event.preventDefault();

        // Grabbed values from text-boxes to store
        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var time = $("#time").val().trim();
        var freq = $("#frequency").val().trim();

        //push to the database
        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: freq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });
    //Firebase watcher & init. loader
    database.ref().on("child_added", function (childSnapshot) {
        var newName = childSnapshot.val().name;
        var newDestination = childSnapshot.val().destination;
        var newTime = childSnapshot.val().time;
        var newFreq = childSnapshot.val().frequency;


        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % newFreq;
        // console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = newFreq - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        //Display on Page
        $("#trainSchedule").append(
            "<tr><td>" + newName +
            "</td><td>" + newDestination +
            "</td><td>" + newFreq +
            "</td><td>" + moment(nextTrain).format("hh:mm") +
            "</td><td>" + tMinutesTillTrain + "</td></tr>");
        // "</td> <button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button><td> + "</td ></tr > ");


    },

        // Handle the errors
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

});