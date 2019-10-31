//This gets the spell information

var _stop;

$(".query-option").on("click", function (event) {
    event.preventDefault();
    console.log($(this).attr("data-option"));
});

$("#submit-button").on("click", function (event) {
    event.preventDefault();

    // _stop = false;



    $(".spell-div").remove();
    $("table").show();
    $("tbody").empty();

    var classSearch = $("#class-search").val().trim().split(' ').join('+');
    var querytype = $("option:selected").attr("data-option");
    var queryURL = "http://www.dnd5eapi.co/api/" + querytype + classSearch;
    $("#class-search").val('');
    console.log(querytype);
    console.log(classSearch);
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (let i = 0; i < response.results.length; i++) {
            var searchTerm = JSON.stringify(response.results[i].name).trim().split(' ').join('+');
            console.log(searchTerm);
            console.log(response.results[i].url);
            if (querytype == "spells/?name=") {
                if ('"' + classSearch + '"' == searchTerm) {

                    $.ajax({
                        url: response.results[i].url,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);
                        var spellDiv = $("<div>").addClass("spell-div");
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
                        for (let i = 0; i < response.classes.length; i++) {
                            $(spellDiv).append("<p>" + response.classes[i].name)
                        }
                    });
                }

                return;

            } else {
                $.ajax({
                    url: response.results[i].url,
                    method: "GET"
                }).then(function (response) {
                    // console.log(response.name);
                    // console.log("—————————————");
                    // This Logs all the spells and classes that use them
                    for (let i = 0; i < response.classes.length; i++) {
                        var classes = (JSON.stringify(response.classes[i].name).toLowerCase().trim());

                        if ('"' + classSearch + '"' == classes) {
                            var tr = $("<tr>").addClass("spell-name").attr("data-url", response.url);
                            $(tr).text(response.name);
                            $("tbody").append(tr);

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
        var spellDiv = $("<div>").addClass("spell-div");
        var classSpan = $("<span>")
        $("#results-display").append(spellDiv);
        $(spellDiv).append("<h2>" + response.name + "</h2>");
        $(spellDiv).append("<p> Range: " + response.range + "</p>");
        $(spellDiv).append("<p> Components: " + response.components + "</p>");
        $(spellDiv).append("<p> Descriptions: " + response.desc + "</p>");
        if (response.higher_level) {
            $(spellDiv).append("<p>" + response.higher_level + "</p>");
        }
        $(spellDiv).append("<p> Ritual: " + response.ritual + "</p>");
        $(spellDiv).append("<p> Duration: " + response.duration + "</p>");
        $(spellDiv).append("<p> Casting Time: " + response.casting_time + "</p>");
        for (let i = 0; i < response.classes.length; i++) {
            $(spellDiv).append("<p>" + response.classes[i].name + "</p>")
        }
    });


});