/* eslint-env node */

var fs = require("fs");

fs.readFile("Zufallsverteilung.csv", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        let taskLists = CSVToArray(data.toString());

        fs.readFile("tasks.json", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let tasks = JSON.parse(data.toString()).taskList;

                for (let i = 0; i < taskLists.length; i++) {
                    let json = {},
                        taskList = [];

                    json.surveyName = "Kontrollstrukturen & Arrays - OOP (" + (i + 1) + ")";

                    taskLists[i].forEach(taskID => {
                        switch (taskID) {
                            case "sh1-l":
                                taskList.push(tasks["sh1-L"]);
                                break;
                            case "sh1-n":
                                taskList.push(tasks["sh1-N"]);
                                break;
                            case "sh1-s":
                                taskList.push(tasks["sh1-S"]);
                                break;
                            case "sh2-l":
                                taskList.push(tasks["sh2-L"]);
                                break;
                            case "sh2-n":
                                taskList.push(tasks["sh2-N"]);
                                break;
                            case "sh2-s":
                                taskList.push(tasks["sh2-S"]);
                                break;
                            case "tb1-l":
                                taskList.push(tasks["tb1-L"]);
                                break;
                            case "tb1-n":
                                taskList.push(tasks["tb1-N"]);
                                break;
                            case "tb1-s":
                                taskList.push(tasks["tb1-S"]);
                                break;
                            case "tb2-l":
                                taskList.push(tasks["tb2-L"]);
                                break;
                            case "tb2-n":
                                taskList.push(tasks["tb2-N"]);
                                break;
                            case "tb2-s":
                                taskList.push(tasks["tb2-S"]);
                                break;
                            case "m1-l":
                                taskList.push(tasks["m1-L"]);
                                break;
                            case "m1-n":
                                taskList.push(tasks["m1-N"]);
                                break;
                            case "m1-s":
                                taskList.push(tasks["m1-S"]);
                                break;
                            case "m2-l":
                                taskList.push(tasks["m2-L"]);
                                break;
                            case "m2-n":
                                taskList.push(tasks["m2-N"]);
                                break;
                            case "m2-s":
                                taskList.push(tasks["m2-S"]);
                                break;
                            default:
                                break;
                        }
                    });
                    
                    json.taskList = taskList;

                    fs.writeFile("00" + (i + 1) + ".json", JSON.stringify(json), function (err) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("Created surveyJSON " + (i + 1));
                        }
                    });
                }
            }
        });
    }
});

// code from https://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}