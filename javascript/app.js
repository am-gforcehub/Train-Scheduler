$(document).ready(function () {


    //variables for on click event
    var name;
    var destination;
    var time;
    var frequency = 0;

    //on click event
    $("#add-train").on("click", function () {
        event.preventDefault();

        // Grabbed values from text-boxes to store
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        time = $("#time").val().trim();
        frequency = $("#frequency").val().trim();

        //push to the database
        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            rate: rate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });