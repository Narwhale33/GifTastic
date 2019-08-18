$(document).ready(function() {

    var comics = [
      "Ironman", "HULK", "THOR", "Hawkeye", "Doctor Strange", "Scarlet Witch",
      "Black Widow", "Captain America", "Captain Marvel", "Black Panther", "Thanos",
      "Ultron", "Loki", "Nick Fury", "Vision"
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".comic-button", function() {
      $("#comics").empty();
      $(".comic-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=0IcAKWm6a3GLfti0PuGEvR99KV8HpwlV&limit=12";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var comicDiv = $("<div class=\"comic-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var comicImage = $("<img>");
            comicImage.attr("src", still);
            comicImage.attr("data-still", still);
            comicImage.attr("data-animate", animated);
            comicImage.attr("data-state", "still");
            comicImage.addClass("comic-image");
  
            comicDiv.append(p);
            comicDiv.append(comicImage);
  
            $("#comics").append(comicDiv);
          }
        });
    });
  
    $(document).on("click", ".comic-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-comic").on("click", function(event) {
      event.preventDefault();
      var newComic = $("input").eq(0).val();
  
      if (newComic.length > 2) {
        comics.push(newComic);
      }
  
      populateButtons(comics, "comic-button", "#comic-buttons");
  
    });
  
    populateButtons(comics, "comic-button", "#comic-buttons");
  });
  