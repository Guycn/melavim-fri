let data = [];
let headers = [];

// טעינת קובץ הנתונים
fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = parseCSV(text);

    headers = data[1]; // שורת הכותרות האמיתית

    showResults(data.slice(2));

});


// מפענח CSV עם מרכאות ופסיקים
function parseCSV(text) {

    let rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (char === '"') {
            insideQuotes = !insideQuotes;
        }

        else if (char === "," && !insideQuotes) {
            row.push(cell);
            cell = "";
        }

        else if (char === "\n" && !insideQuotes) {
            row.push(cell);
            rows.push(row);
            row = [];
            cell = "";
        }

        else {
            cell += char;
        }
    }

    row.push(cell);
    rows.push(row);

    return rows;
}


// הצגת כרטיסים
function showResults(rows) {

    let results = document.getElementById("results");
    let count = document.getElementById("count");

    results.innerHTML = "";

    count.innerHTML = "נמצאו " + rows.length + " נסיעות";


    rows.forEach(row => {

        let card = document.createElement("div");
        card.className = "card";


        row.forEach((value, index) => {

            if(value.trim() !== "") {

                let line = document.createElement("div");

                line.textContent =
                headers[index] + ": " + value;

                card.appendChild(line);
            }

        });


        results.appendChild(card);

    });

}


// חיפוש
document.getElementById("search").addEventListener("input", function(){

    let search = this.value.toLowerCase();

    let filtered = data.slice(2).filter(row =>
        row.join(" ").toLowerCase().includes(search)
    );

    showResults(filtered);

});
