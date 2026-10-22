let data = [];
let headers = [];

fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = parseCSV(text);

    headers = data[1];

    showResults(data.slice(2));

});


// קריאת CSV כולל מרכאות ופסיקים בתוך טקסט
function parseCSV(text) {

    let rows = [];
    let row = [];
    let cell = "";
    let quotes = false;

    for (let char of text) {

        if (char === '"') {
            quotes = !quotes;
        }

        else if (char === "," && !quotes) {
            row.push(cell);
            cell = "";
        }

        else if (char === "\n" && !quotes) {
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


// הצגת תוצאות
function showResults(rows) {

    let results = document.getElementById("results");
    let count = document.getElementById("count");

    results.innerHTML = "";

    count.innerHTML = "נמצאו " + rows.length + " נסיעות";


    rows.forEach(row => {

        let card = document.createElement("div");
        card.className = "card";


        row.forEach((value,index)=>{

            if(value.trim()) {

                let div = document.createElement("div");

                div.textContent =
                headers[index] + ": " + value;

                card.appendChild(div);
            }

        });


        results.appendChild(card);

    });
}


// חיפוש
document.getElementById("search").addEventListener("input", function(){

    let text = this.value.toLowerCase();

    let filtered = data.slice(2).filter(row =>
        row.join(" ").toLowerCase().includes(text)
    );

    showResults(filtered);

});
