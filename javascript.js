//This gets the spell information

var _stop;

$(".query-option").on("click", function (event) {
    event.preventDefault();
    console.log($(this).attr("data-option"));
});

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    // _stop = false;

    index = 0;

    $(".spell-div").remove();

    $(".school-div").remove();
    $("table").show();
    $("tbody").empty();

    var classSearch = $("#class-search").val().trim().split(' ').join('+');
    var querytype = $("option:selected").attr("data-option");
    var queryURL = "http://www.dnd5eapi.co/api/" + querytype + classSearch;
    var index;
    $("#class-search").val('');
    console.log(querytype);
    console.log(classSearch);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)

        for (let i = 0; i < response.results.length; i++) {
            var searchTerm = JSON.stringify(response.results[i].name).trim().split(' ').join('+');

            // Will do this ajax call if your search query is for spells specifically
            if (querytype == "spells/?name=") {
                if ('"' + classSearch + '"' == searchTerm) {

                    $.ajax({
                        url: response.results[i].url,
                        method: "GET"
                    }).then(function (response) {
                        // console.log(response);
                        var spellDiv = $("<div>").addClass("spell-div");
                        var classLoop = [];
                        response.classes.forEach(element => {
                            return classLoop.push(element.name);
                        });

                        $("#results-display").append(spellDiv);
                        $(spellDiv).append("<h2>" + response.name + "</h2>");
                        $(spellDiv).append("<p> Range: " + response.range + "</p>");
                        $(spellDiv).append("<p> Components: " + response.components + "</p>");
                        for (let i = 0; i < response.desc.length; i++) {
                            $(spellDiv).append("<p>" + response.desc[i])
                        }
                        // $(spellDiv).append("<p> Descriptions: " + response.desc + "</p>");
                        if (response.higher_level) {
                            $(spellDiv).append("<p>" + response.higher_level + "</p>");
                        }
                        if (response.ritual) {
                            $(spellDiv).append("<p> Ritual: " + response.ritual + "</p>");
                        }
                        $(spellDiv).append("<p> Duration: " + response.duration + "</p>");
                        $(spellDiv).append("<p> Casting Time: " + response.casting_time + "</p>");
                        $(spellDiv).append("<p>" + classLoop.join(', ') + "</p>")
                    });
                }

                return;

            } else {
                //AJAX calls for spells based on class search
                $.ajax({
                    url: response.results[i].url,
                    method: "GET"
                }).then(function (response) {
                    // console.log(response.name);

                    // This Logs all the spells and classes that use them
                    for (let j = 0; j < response.classes.length; j++) {
                        var classes = (JSON.stringify(response.classes[j].name).toLowerCase().trim());

                        //If user class a user searches with exists it will return all of their spells.
                        if ('"' + classSearch + '"' == classes) {
                            var tr = $("<tr>");
                            var tdNum = $("<td>").append("<p><strong>" + (i + 1) + "</strong></p>");
                            var tdSpell = $("<td>").addClass("spell-name").attr("data-url", response.url);

                            //Holds all the classes for each spell in the table
                            var classLoop = [];

                            //This puts all the classes on the right place in the table inline
                            response.classes.forEach(element => {
                                return classLoop.push(element.name);
                            });

                            var tdClasses = $("<td>").append("<p>" + classLoop.join(', ') + "</p>");
                            var tdSchool = $("<td>").text(response.school.name).addClass("school-name").attr("data-url", response.school.url);

                            console.log(response.url)

                            $(tdSpell).text(response.name);
                            $("tbody").append(tr);
                            $(tr).append(tdNum);
                            $(tr).append(tdSpell);
                            $(tr).append(tdClasses);
                            $(tr).append(tdSchool);

                        }
                    }
                });
            }
        }
        console.log(response);
    })
});

$(document).on("click", ".spell-name", function () {
    _stop = true;
    $("table").hide()
    console.log($(this).attr("data-url"));

    $.ajax({
        url: $(this).attr("data-url"),
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var spellDiv = $("<div>").addClass("spell-div card");
        var cardBody = $("<div>").addClass("card-body")
        var classLoop = [];
        response.classes.forEach(element => {
            return classLoop.push(element.name);
        });
        $("#results-display").append(spellDiv);
        $(spellDiv).append(cardBody);
        $(cardBody).append("<h5>" + response.name + "</h5>").addClass("card-title");
        $(cardBody).append("<p> Range: " + response.range + "</p>").addClass("card-subtitle mb-2 text-muted");
        $(cardBody).append("<p> Components: " + response.components + "</p>");
        $(cardBody).append("<p> Description: " + response.desc + "</p>");
        if (response.higher_level) {
            $(cardBody).append("<p>" + response.higher_level + "</p>");
        }
        $(cardBody).append("<p> Ritual: " + response.ritual + "</p>");
        $(cardBody).append("<p> Duration: " + response.duration + "</p>");
        $(cardBody).append("<p> Casting Time: " + response.casting_time + "</p>");
        $(cardBody).append("<p>" + classLoop.join(', ') + "</p>")
        console.log(classLoop);

    });

});

$(document).on("click", ".school-name", function () {
    _stop = true;
    $("table").hide()
    console.log($(this).attr("data-url"));

    $.ajax({
        url: $(this).attr("data-url"),
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var schoolDiv = $("<div>").addClass("school-div");
        $("#results-display").append(schoolDiv);
        $(schoolDiv).append("<h2>" + response.name + "</h2>");
        $(schoolDiv).append("<p> Description: " + response.desc + "</p>");
    });


});