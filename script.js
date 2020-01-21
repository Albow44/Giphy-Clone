var characterArr = ["Stormtrooper", "Yoda", "Star Wars", "Tie Fighter", "Luke Skywalker",
                  "Chewbacca", "Darth Vader", "Princess Leia", "Jabba", "Baby Yoda", "Hoth",
                  "Emperor Palpatine", "Han Solo", "Ewok", "R2D2", "C3PO",
                  "Rey Skywalker", "Kylo Ren", "Endor"];

function renderButtons() {
  $("#buttonPanel").empty();

  for (var i = 0; i < characterArr.length; i++) {
    var button = $("<button>");
    button.addClass("characterButton");
    button.attr("data-character", characterArr[i]);
    button.text(characterArr[i]);

    $("#buttonPanel").append(button);
  }
}

$("#add-character").on("click", function(event) {
  event.preventDefault();

  var character = $("#character-input").val().trim();

  characterArr.push(character);
  $("#character-input").val("");

  renderButtons();
});

function fetchCharacterGifs() {
  var characterName = $(this).attr("data-character");
  var characterStr = characterName.split(" ").join("+");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + characterStr +
                 "&api_key=ia9avzFaQmiszFiueudIvPgxnCaF2mcQ";
console.log($);
console.log($.jquery);
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    var dataArray = result.data;

    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("characterGif");

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#gifPanel").append(newDiv);
    }
  });
}

function animateCharacterGif() {
  var state = $(this).find("img").attr("data-state");

  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".characterButton", fetchCharacterGifs);

$(document).on("click", ".characterGif", animateCharacterGif);