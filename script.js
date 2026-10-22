let data = [];

fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = text.split("\n").map(row => row.split(","));

    showTable(data);

});


function showTable(rows) {

    let table = document.getElementById("table");

    table.innerHTML = "";

    rows.forEach((row, index) => {

        let tr = document.createElement("tr");

        row.forEach(cell => {

            let td = document.createElement(index === 0 ? "th" : "td");

            td.textContent = cell;

            tr.appendChild(td);

        });

        table.appendChild(tr);

    });

}


document.getElementById("search").addEventListener("input", function(){

    let search = this.value.toLowerCase();

    let filtered = data.filter(row =>
        row.join(" ").toLowerCase().includes(search)
    );

    showTable(filtered);

});