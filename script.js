let data = [];

fetch("data.csv")
.then(response => response.text())
.then(text => {

    data = text.split("\n").map(row => row.split(","));

    showResults(data);

});


function showResults(rows) {

    let results = document.getElementById("results");
    let count = document.getElementById("count");

    results.innerHTML = "";

    count.innerHTML = "נמצאו " + (rows.length - 1) + " תוצאות";

    rows.slice(1).forEach(row => {

        if(row.join("").trim() === "") return;

        let card = document.createElement("div");
        card.className = "card";

        row.forEach((cell, index) => {

            let line = document.createElement("div");

            line.textContent = cell;

            card.appendChild(line);

        });

        results.appendChild(card);

    });

}


document.getElementById("search").addEventListener("input", function(){

    let text = this.value.toLowerCase();

    let filtered = data.filter(row =>
        row.join(" ").toLowerCase().includes(text)
    );

    showResults(filtered);

});
