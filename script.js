let allData = [];

fetch("data.csv")
.then(response => response.text())
.then(data => {

    allData = parseCSV(data);

    showTable(allData);

});


function parseCSV(text) {

    let rows = [];
    let row = [];
    let cell = "";
    let quote = false;

    for (let char of text) {

        if (char === '"') {
            quote = !quote;
        }

        else if (char === "," && !quote) {
            row.push(cell);
            cell = "";
        }

        else if (char === "\n" && !quote) {
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



function showTable(data) {

    let table = document.getElementById("table");

    if (!table) return;

    table.innerHTML = "";


    data.forEach((row, index) => {

        let tr = document.createElement("tr");

        row.forEach(cell => {

            let td = document.createElement(index === 1 ? "th" : "td");

            td.textContent = cell;

            tr.appendChild(td);

        });

        table.appendChild(tr);

    });

}



document.getElementById("search")
.addEventListener("input", function(){

    let value = this.value.toLowerCase();


    let filtered = allData.filter(row =>

        row.join(" ")
        .toLowerCase()
        .includes(value)

    );


    showTable(filtered);

});
