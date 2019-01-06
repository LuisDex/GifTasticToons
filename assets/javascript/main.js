//Starting Array of Cartoon Shows
var faveToons = ["Danny Phantom", "Invader Zim", "Teen Titans", "Johnny Bravo", "Courage the Cowardly Dog", "Batman Beyond", "Justice League Unlimited", "Gargoyles", "Hey Arnold", "Rockos Modern Life", "Ducktales", "Dexters Lab", "Powerpuff Girls", "Darkwing Duck"];

//Prepares the document before running the JS.
$(document).ready(function () {

    // Function that cycles through the faveToons Array to create buttons corresponding to the elements within it. 
    function toonButtons() {
        $("#buttonArea").empty();
        for (var i = 0; i < faveToons.length; i++) {
            var toon = $("<button>").addClass("toonBTN btn btn-primary mybtn").attr("toonName", faveToons[i]).text(faveToons[i]);
            $("#buttonArea").append(toon);
        };
    };

    //Function that displays the gifs for the button that was pressed.
    function displayGifs(x) {
        $("#gifArea").empty();
        var toonChoice = x;
        var toonURL = "https://api.giphy.com/v1/gifs/search?q=" +
            toonChoice + "&api_key=65lvuKCOhl2R5Y8WSPdutJMjrbscFXY2&limit=10";

        $.ajax({
            url: toonURL,
            method: "GET"
        })

            .then(function (response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var toonSpace = $("<div>");
                    toonSpace.addClass("imgDiv");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var toonImg = $("<img>");
                    toonImg.addClass("toonGIF").attr("src", results[i].images.fixed_height_still.url).attr("value", "still").attr("stillURL", results[i].images.fixed_height_still.url).attr("movingURL", results[i].images.fixed_height.url);
                    toonSpace.append(toonImg);
                    toonSpace.append(p);
                    $("#gifArea").prepend(toonSpace);
                }
            });
    };

    //Listener that waits for the user to fill in a new toon to add as a button. If the button is pressed, but the text box is empty the function will not run.
    $("#newToon").on("click", function (event) {
        event.preventDefault();
        var newToon = $("#addToon").val().trim();
        if (newToon != "") {
            faveToons.push(newToon);
            toonButtons();
            $("#addToon").val("");
        }
    });

//Listener that calls the "Display Gifs" function when a button is pressed.
    $(document).on("click", ".toonBTN", function () {
        displayGifs($(this).attr("toonName"));
    });

//Listener that makes the gifs run or stop when pressed, based on their previous status.
    $(document).on("click", ".toonGIF", function () {

        var isMoving = $(this).attr("value");
        if (isMoving === "still") {
            $(this).attr("src", $(this).attr("movingURL"));
            $(this).attr("value", "moving");
        } else {
            $(this).attr("src", $(this).attr("stillURL"));
            $(this).attr("value", "still");
        }
    });

//Creates the initial buttons from the pre-set array.
    toonButtons();


})