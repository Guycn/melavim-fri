let data = [];
let headers = [];

fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = parseCSV(text);

    headers = data[1];

    showResults(data.slice(2));

});


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


function showResults(rows) {

    let results = document.getElementById("results");
    let count = document.getElementById("count");

    results.innerHTML = "";

    count.innerHTML = "נמצאו " + rows.length + " נסיעות";


    rows.forEach(row => {

        let card = document.createElement("div");
        card.className = "card";


        card.innerHTML = `
        <div class="title">🚍 ${row[3] || ""}</div>

        <div>
        🕒 <b>שעה:</b> ${row[2] || ""}
        </div>

        <div>
        🚐 <b>רכב:</b> ${row[1] || ""}
        </div>

        <div>
        🏫 <b>מסלול:</b> ${row[4] || ""}
        </div>

        <div>
        👨‍✈️ <b>נהג:</b> ${row[5] || ""}
        </div>

        <div class="escort">
        👤 <b>מלווה:</b> ${row[6] || ""}
        </div>

        <div>
        📝 <b>הערות:</b> ${row[7] || ""}
        </div>
        `;


        results.appendChild(card);

    });

}


document.getElementById("search").addEventListener("input", function(){

    let text = this.value.toLowerCase();

    let filtered = data.slice(2).filter(row =>
        row.join(" ").toLowerCase().includes(text)
    );

    showResults(filtered);

});
