$(document).on("click", "#add-roll", function() {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  $("#rolls-appear-here").text("You actually have to input things you fool");
  $("#modifier-here").empty();
  $("#total").empty();
  var total = 0;
  var DiceNum = $("#DiceNum-input")
    .val()
    .trim();
  var DiceValpre = $("#DiceVal-input")
    .val()
    .trim();
  var DiceVal = parseInt(DiceValpre);
  var mod = $("#mod-input")
    .val()
    .trim();
  total = 0 + parseInt(mod);
  $("#rolls-appear-here").empty();
  console.log(DiceVal);
  console.log(DiceValpre);
  // var GifFinder = $(this).attr("data-name");
  var queryURL = "http://roll.diceapi.com/json/" + DiceNum + "d" + DiceVal;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#rolls-view").empty();
    // $("#GIF-view").append("<div>" + response.Title + "</div>");
    // $("#DiceNum-input").val("");
    // $("#DiceVal-input").val("");
    // $("#mod-input").val("");

    var results = response.dice;
    for (var i = 0; i < results.length; i++) {
      var rollDiv = $("<div>");
      var p = $("<p>");
      $(p).text("d" + DiceVal + " #" + (i + 1) + ": " + results[i].value);
      total = total + results[i].value;
      $(rollDiv).append(p);
      $("#rolls-appear-here").append(rollDiv);
      $("#modifier-here").text("Modifier: " + mod);
      $("#total").text("Total: " + total);
    }
  });
});
// The GIF from the textbox is then added to our array

// Calling renderButtons which handles the processing of our GIF array
